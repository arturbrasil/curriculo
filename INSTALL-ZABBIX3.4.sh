
apt-get update
apt install -y apache2 php7.0
apt-get install wget htop curl nano ssh -y
apt-get install libcurl3 libiksemel3 libodbc1 libopenipmi0 libssh2-1 -y
apt-get install snmp-mibs-downloader -y
apt-get install php libapache2-mod-php php-mcrypt php-mysql -y
apt-get install php-mbstring php-bcmath php-xmlwriter -y
apt-get install build-essential snmp vim libssh2-1-dev libssh2-1 libopenipmi-dev libsnmp-dev wget libcurl4-gnutls-dev fping libxml2 libxml2-dev curl -y
apt-get install libcurl3-gnutls libcurl3-gnutls-dev libiksemel-dev libiksemel-utils libiksemel3 libevent-dev libpcre3-dev -y
apt-get install php-net-socket libsnmp-dev libevent-dev libpcre3-dev mariadb-server language-pack-pt -y
apt-get install php-mbstring php-bcmath php-xmlwriter -y
apt-get install php libapache2-mod-php php-mcrypt php-mysql php-gd -y
add-apt-repository -y ppa:webupd8team/java
apt-get update
apt-get install oracle-java8-installer oracle-java8-set-default -y
apt-get install libcurl4-gnutls-dev fping libxml2 libxml2-dev -y
apt-get install libmysqld-dev libiksemel3 libevent-dev libpcre3-dev -y
apt-get install zabbix-server-mysql -y
apt-get install zabbix-frontend -y
mkdir -p /opt/zabbix
cd /opt/zabbix

# wget "https://ufpr.dl.sourceforge.net/project/zabbix/ZABBIX%20Release%20Candidates/3.4.2rc2/zabbix-3.4.2rc2.tar.gz"
# tar -zxvf zabbix-3.4.2rc2.tar.gz
# cd zabbix-3.4.2rc2
# ./configure --enable-server --enable-agent --enable-java --with-mysql --with-net-snmp --with-libcurl=/usr/bin/curl-config --with-ssh2 --with-openipmi --with-libxml2 --prefix=/opt/zabbix

wget http://repo.zabbix.com/zabbix/3.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.4-1+xenial_all.deb

dpkg -i zabbix-release_3.4-1+xenial_all.deb

apt-get update 

apt-get install -y zabbix-server-mysql zabbix-frontend-php zabbix-agent zabbix-get zabbix-sender snmp snmpd snmp-mibs-downloader php7.0-bcmath php7.0-xml php7.0-mbstring


export DEBIAN_FRONTEND=noninteractive


mysql -uroot -e "CREATE DATABASE zabbix CHARACTER SET utf8 COLLATE utf8_bin";
mysql -uroot -e "CREATE USER 'zabbix'@'localhost'";
mysql -uroot -e "GRANT ALL ON zabbix.* TO 'zabbix'@'localhost'";

mysql -uroot -e "SHOW DATABASES";
mysql -uroot -e "SELECT host, user FROM mysql.user";
mysql -uroot -e "SHOW GRANTS FOR 'zabbix'@'localhost'";

zcat /usr/share/doc/zabbix-server-mysql/create.sql.gz | mysql -uroot zabbix -p

apt install -y apache2 php7.0
> /var/www/html/index.html 

sed -i 's/# php_value date.timezone Europe\/Riga/php_value date.timezone America\/Sao_Paulo/g' /etc/apache2/conf-enabled/zabbix.conf

service apache2 restart


wget https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana_4.5.2_amd64.deb
sudo apt-get install -y adduser libfontconfig
sudo dpkg -i grafana_4.5.2_amd64.deb

grafana-cli plugins install alexanderzobnin-zabbix-app
grafana-cli plugins update alexanderzobnin-zabbix-app
service grafana-server restart


#cd /opt/zabbix/zabbix-3.4.2rc2/database/mysql/
#cat schema.sql | mysql -uroot zabbix
#cat images.sql | mysql -uroot zabbix
#cat data.sql | mysql -uroot zabbix


