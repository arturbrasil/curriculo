#!/bin/python
import csv
import atexit
import paramiko
import logging
#logging.basicConfig(filename='ubnt.log', level=logging.ERROR, 
logging.basicConfig(filename='ubnt.log',
                    format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger=logging.getLogger(__name__)
class myssh:

  def __init__(self, host, user, password, port = 22):
    client = paramiko.SSHClient()
    client.load_system_host_keys()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, port=port, username=user, password=password)
    atexit.register(client.close)
    self.client = client

  def __call__(self, command):
    stdin,stdout,stderr = self.client.exec_command(command)
    sshdata = stdout.readlines()
    for line in sshdata:
      print(line)

print __doc__
f = csv.reader(open('ubiquity.txt'), delimiter=',')
senhas = ['aa', 'bbb','ccc']
for [ ip, port ] in f:
  #print '%s | %s | %s' % (ip,usuario)
  for senha in senhas:
    try:
      remote = myssh(ip,"ubnt",senha)
      print("Fazendo: %s - ubnt - %s" % (ip,senha))
      remote("sed '/sshd.status=enabled/a snmp.status=enabled' -i /tmp/system.cfg")
      remote("sed '/snmp.status=enabled/a snmp.location=COLOCARNODOPOP' -i /tmp/system.cfg")
      remote("sed '/snmp.location=COLOCARNODOPOP/a snmp.contact=Quicknet' -i /tmp/system.cfg")
      remote("sed '/snmp.contact=Quicknet/a snmp.community=QN17MN1' -i /tmp/system.cfg")
      remote("sed '/snmp.status=disabled/d' -i /tmp/system.cfg")
      remote("cfgmtd -w -f /tmp/system.cfg")
      remote("/usr/etc/rc.d/rc.softrestart save")
      logger.info("ATIVADO no %s - %s -  %s" (ip,usuario,senha))
#except ZeroDivisionError as err:
    except Exception as err:
#    logf.write("Falhou com %s %s %s" % ip usuario senha
#    logf.write("Erro no %s - %s segue detalhes: %s" % (ip, usuario, str(e)) )
      logger.error(err)
      logger.info(ip)
      logger.info(senha)

~                              
