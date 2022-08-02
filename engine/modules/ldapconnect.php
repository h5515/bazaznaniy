<?php

function base64ToFile($data, $path)
{
    $source = fopen($data, 'r');
    $destination = fopen($path, 'w');

    stream_copy_to_stream($source, $destination);
    fclose($source);
    fclose($destination);
}

function getStringBetween($str,$from,$to)
{
    $sub = substr($str, strpos($str,$from)+strlen($from),strlen($str));
    return substr($sub,0,strpos($sub,$to));
}

function ldap_auth($user, $pass)
{
    global $member_id, $user_group;
    //ip адрес или название сервера ldap(AD) 
    $ldap_server = "10.1.82.6"; //или "mydomain.ru" 
    $ldap_server_spare = "10.1.82.33";
    //Порт подключения 
    $ldapport = "389";
    //Полный путь к группе которой должен принадлежать человек,  
    //Откуда начинаем искать  
    $base = "OU=FTO,DC=ftoprj,DC=lcl";
    //Собственно говоря фильтр по которому будем аутентифицировать пользователя 
    $filter = "(&(objectClass=user)(samaccountname=%user%))";
    //Ваш домен, обязательно с собакой впереди. Необходим этот параметр  
    //для авторизации через AD, по другому к сожалению работать не будет. 
    $domain = "ftoprj.lcl";

    //Атрибуты получаемые из LDAP thumbnailPhoto,telephoneNumber,title,department,manager,company,mobile,name
    $attrldap = array("displayname", "mail", "givenname", "sn", "useraccountcontrol", "samaccountname", "company", "telephoneNumber", "department", "mobile", "thumbnailPhoto", "memberof");

    $LDAP = array(
        'server' => $ldap_server,
        'port' => $ldapport, 
    );

    $ServerOn = false;
    $timeout = 2;
    $ServerOn = @fsockopen($ldap_server, $ldapport, $errno, $errstr, $timeout);
    if (!$ServerOn) {
        $ServerOn = @fsockopen($ldap_server_spare, $ldapport, $errno, $errstr, $timeout);
        $ldap_server = $ldap_server_spare;
    }
    if (!$ServerOn) die("Could not connect to LDAP server.");

    $ldapconn = ldap_connect($LDAP['server'], $LDAP['port']) or die('Не могу подключиться к LDAP-серверу: ' . $LDAP['server'] . ', порт ' . $LDAP['port']);
    ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

    $ldap_user = $user . "@" . $domain;
    $ldap_pass = $pass;

    $ldapbind = false;
    if ($ldapconn) {
        // try to bind/authenticate against ldap
        $ldapbind = @ldap_bind($ldapconn, $ldap_user, $ldap_pass);

/*        if (($ldapbind) && (is_null($member_id['avtoriz_ad']))) {
            ldap_get_option($ldapconn, LDAP_OPT_DIAGNOSTIC_MESSAGE, $extended_error);

            if (!empty($extended_error)) {
                $errno = explode(',', $extended_error);
                $errno = $errno[2];
                $errno = explode(' ', $errno);
                $errno = $errno[2];
                $errno = intval($errno);
                die('Что-то пошло не так: ' . $extended_error);
            }

            $ldapbind = false;
            $filter = str_replace('%user%', $user, $filter);
            $search = ldap_search($ldapconn, "OU=FTO,DC=ftoprj,DC=lcl", $filter, $attrldap);
            $number = ldap_count_entries($ldapconn,  $search);
            if ($number > 0) {
                if ($entries = ldap_get_entries($ldapconn, $search)) {
                    $entry = $entries[0];
                    $ldat = time(); //

                    $salt = str_shuffle("abchefghjkmnpqrstuvwxyz0123456789" . $stronghash);
                    $rand_lost = "";
                    for ($i = 0; $i < 15; $i++) {
                        $rand_lost .= $salt[mt_rand(0, 33)];
                    }
                    $hashid = sha1(md5($entry['mail']) . time() . $rand_lost);
                    $filfoto = '';
                    if (!is_null($entry['thumbnailphoto'][0])) {
                        $photo = 'data:image/jpeg;base64,' . base64_encode($entry['thumbnailphoto'][0]);
                        base64ToFile($photo, 'uploads/fotos/' . $entry['samaccountname'][0] . '.jpg');
                        $filfoto = $entry['samaccountname'][0] . '.jpg';
                    }
                    $br = false;
                    $usergrup = 4;
                    foreach ($entry['memberof'] as $adgrup) {
                        $mgrup = getStringBetween($adgrup,'=',',');
                        foreach ($user_group as $usgrup) {
                            if (strtoupper($mgrup)==strtoupper($usgrup['group_name'])){
                                $br = true;
                                $usergrup = $usgrup['id'];
                                break;
                            }
                        }
                        if ($br) break;
                    }

                    $db = new db;
                    $regpassword = $db->safesql(password_hash($ldap_pass, PASSWORD_DEFAULT));

                    $db->query("INSERT INTO " . USERPREFIX . "_users (email, name, password, user_group, lastdate, reg_date, allow_mail, foto, fullname,hash) 
             values ('{$entry['mail'][0]}','{$entry['samaccountname'][0]}','{$regpassword}','{$usergrup}',{$ldat},{$ldat},1,'{$filfoto}','{$entry['displayname'][0]}','{$hashid}')");
                    $db->close();
                    $db->free();
                    $ldapbind = true;
                    //langdate( "j.m.Y", $row['reg_date'] )
                }
            }
        }*/
    }
    ldap_close($ldapconn);
    return  $ldapbind;
}
