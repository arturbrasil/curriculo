#!/bin/bash

apt update
apt install lolcat -y

# Definindo as variáveis
professor="Artur Brasil"
escola="Artistas da Monitoração"
data=$(date "+%d/%m/%Y")

clear
# Cabeçalho
tput setaf 3
tput bold
echo "
╔══════════════════════════════════════════════════════════╗
║                  $professor                            ║
║               $escola                    ║
║                 Data: $data                         ║
║                                                          ║
║                Instalação do Zabbix Proxy                ║
╚══════════════════════════════════════════════════════════╝
" | lolcat

# Pede ao usuário a versão do Zabbix a ser instalada
echo -e "\e[32mDigite a versão do Zabbix que deseja instalar (exemplo: 5.4.3):\e[0m"
read version

# Extrai a base da versão (exemplo: 5.4)
base_version=$(echo $version | cut -d '.' -f 1,2)

# Pede ao usuário o valor do ProxyMode
echo -e "\e[32mDigite o valor desejado para ProxyMode (1 ou 0):\e[0m"
read proxymode

# Pede ao usuário o valor do Server
echo -e "\e[32mDigite o IP do servidor Zabbix:\e[0m"
read server

# Define o nome do host como hostname do sistema
hostname=$(hostname)

# Instala dependencias
sudo apt install make gcc -y
apt install libmysqlclient-dev -y  
apt install libsqlite3-dev -y
apt install libxml2-dev -y
apt install unixodbc-dev -y
apt install libsnmp-dev snmp -y
apt install libssh2-1-dev libssh2-1 -y  
apt install libevent-dev -y 
apt install cpanminus -y
apt install libpcre* -y
apt install libcurl4-gnutls-dev -y

# Adciona grupo
addgroup --system --quiet zabbix

# Adciona Usuário
adduser --quiet --system --disabled-login --ingroup zabbix --home /var/lib/zabbix --no-create-home zabbix
mkdir -m u=rwx,g=rwx,o= -p /var/lib/zabbix

# Alterando dono do diretório
chown zabbix:zabbix /var/lib/zabbix

mkdir -p /var/log/zabbix/ 
mkdir -p /etc/zabbix/
touch /var/log/zabbix/zabbix_proxy.log
mkdir -p /opt/zabbix
chown zabbix:zabbix /opt/zabbix -R 
chown zabbix:zabbix /var/log/zabbix/ -R
mkdir /run/zabbix/
touch /run/zabbix/zabbix_proxy.pid
chown zabbix:zabbix /run/zabbix/ -R



# Baixa o pacote do Zabbix Proxy na versão desejada
echo -e "\e[34mBaixando o pacote do Zabbix Proxy na versão $version...\e[0m"
wget https://cdn.zabbix.com/zabbix/sources/stable/$base_version/zabbix-$version.tar.gz

# Extrai o pacote
echo -e "\e[31mExtraindo o pacote...\e[0m"
tar -xzf zabbix-$version.tar.gz

# Entra no diretório do Zabbix Proxy
cd zabbix-$version/



echo -e "\e[33mConfigurando o Zabbix Proxy...\e[0m"
./configure  --sysconfdir=/etc/zabbix --prefix=/opt/zabbix  --enable-agent --enable-ipv6 --with-net-snmp --with-libcurl --with-unixodbc --enable-proxy  --with-net-snmp --with-sqlite3  --with-ssh2 CFLAGS=-I/usr/include/libxml2

echo -e "\e[34mCompilando o Zabbix Proxy...\e[0m"
# Compila o Zabbix Proxy
make

echo -e "\e[35mInstalando o Zabbix Proxy...\e[0m"
# Instala o Zabbix Proxy
make install

# Instala DB sqlite3 

sudo -u zabbix sqlite3 /opt/zabbix/zabbix-proxy.db < database/sqlite3/schema.sql

echo -e "\e[34mCriando o  de configuração do Zabbix Proxy...\e[0m"
# Cria o arquivo de configuração do Zabbix Proxy
cat <<EOF > /etc/zabbix/zabbix_proxy.conf
ProxyMode=$proxymode
Server=$server
Hostname=$hostname
LogFile=/var/log/zabbix/zabbix_proxy.log
PidFile=/run/zabbix/zabbix_proxy.pid
DBName=/opt/zabbix/zabbix-proxy.db 
#DBUser=zabbix
ProxyLocalBuffer=0
ProxyOfflineBuffer=1
HeartbeatFrequency=60
ConfigFrequency=3600
DataSenderFrequency=1
StartPollers=30
StartPreprocessors=3
StartPollersUnreachable=5
StartPingers=5
StartDiscoverers=1
HousekeepingFrequency=1
CacheSize=512M
StartDBSyncers=4
Timeout=30
FpingLocation=/usr/bin/fping
Fping6Location=/usr/bin/fping6
LogSlowQueries=3000
StatsAllowedIP=0.0.0.0/0
EOF


echo -e "\e[33mCriando o arquivo de serviço do Zabbix Proxy...\e[0m"
# Cria o arquivo de serviço do Zabbix Proxy
cat <<EOF > /etc/systemd/system/zabbix-proxy.service
[Unit]
Description=Zabbix Proxy
After=syslog.target network.target

[Service]
User=zabbix
Group=zabbix
Type=forking
PIDFile=/run/zabbix/zabbix_proxy.pid
ExecStart=/opt/zabbix/sbin/zabbix_proxy -c /etc/zabbix/zabbix_proxy.conf
ExecStop=/bin/kill -SIGTERM $MAINPID
Restart=always
TimeoutSec=30s
StartLimitInterval=350
StartLimitBurst=10

[Install]
WantedBy=multi-user.target
EOF

# Recarrega o daemon do systemd para carregar o novo arquivo de serviço
echo -e "\e[32mRecarregando o daemon do systemd\e[0m"
systemctl daemon-reload

# Inicia o serviço do Zabbix Proxy
echo -e "\e[32mIniciando o serviço do Zabbix Proxy\e[0m"
systemctl start zabbix-proxy

# Verifica o status do serviço
echo -e "\e[32mVerificando o status do serviço do Zabbix Proxy\e[0m"
systemctl status zabbix-proxy


