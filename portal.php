<?php
$app = (isset($_GET['app'])) ? $_GET['app'] : 'Nao foi passado o parametro APP' ;
$hostid = (isset($_GET['hostid'])) ? $_GET['hostid'] : 'Nao foi passado o parametro HOSTID' ;

                $host = 'localhost';
                $user = 'zabbix';
                $password = '';
                $dbname = 'zabbix';
                $dbtype = 'MYSQL';
                $zdbtype = $dbtype;
                //echo $this->zdbtype;
                        $con = mysqli_connect($host,$user,$password);
                        mysqli_select_db($con,$dbname);
                        if ($con) {
                                #echo "Conexao efetuada com sucesso\n";
                                $query = "SELECT ip FROM interface WHERE hostid='$hostid' limit 1;";
                                #echo $query;
                                $result1 = mysqli_query($con,$query);
                                #echo $number=@mysqli_num_rows($result1);
                                $row1 = mysqli_fetch_array($result1);
                                #echo $row1;
                                #print_r($row1);

                        } else {
                                echo "Conexao nao efetuada <br>" . mysqli_error();
                        }



$ipaddress = $row1['ip'];
#echo $app;
if ($app == "web") {
        header("Location: http://$ipaddress");
}

if ($app == "mikrotik") { 
        header("Location: mikrotik:$ipaddress");
}

if ($app == "winbox") {
        header("Location: ssh:$ipaddress");
}

if ($app == "puttyssh") {
        header("Location: puttyssh:$ipaddress");
}

if ($app == "winmtr") {
        header("Location: winmtr:$ipaddress");
}

?>
