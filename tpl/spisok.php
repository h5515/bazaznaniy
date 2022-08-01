<?php
define('DATALIFEENGINE', true);
define('ROOT_DIR', dirname(__FILE__) . '/../');
define('ENGINE_DIR', ROOT_DIR . 'engine');
include ENGINE_DIR . '/data/config.php';
require_once ENGINE_DIR . '/classes/mysql.php';
require_once ENGINE_DIR . '/data/dbconfig.php';
require_once ENGINE_DIR . '/modules/functions.php';

function compile_user($us = '')
{
    global $db_gl, $config;
    if ($us != '')
        $dop = "AND fullname LIKE '%{$us}%'";
    else
        $dop = "";
    $rows = $db_gl->query("SELECT fullname, foto, name FROM dle_users WHERE activity = 1 $dop ORDER BY fullname LIMIT 30");
    $shablon = shablon_load("spisok_user.html");
    $html = '';
    foreach ($rows as $key => $value) {
        if (isset($value['foto']) && $value['foto'] != '') {
            if (!file_exists(ROOT_DIR . "/uploads/fotos/" . $value['foto'])) {
                $value['foto'] = "/templates/Default/dleimages/noavatar.png";
            } else {
                $value['foto'] = $config['http_home_url'] . "uploads/fotos/" . $value['foto'];
            }
        } else $value['foto'] = "/templates/Default/dleimages/noavatar.png";
        $value['imagmen'] = false;
        $value['manager'] = '';
        $value['adgrup'] = '';
        $html .= compile_table($shablon, $value);
    }
    return $html;
}

function compile_grup($us = '')
{
    global $db_gl;
    $html = '';
    /*$db2 = new db;
    $db2->connect('root','33Hdinjr','fto_online');
    $rows = $db2->query("SELECT grups, name FROM dle_users");
    foreach ($rows as $key => $value) {
        $db->query("UPDATE dle_users set grups = '{$value['grups']}' WHERE name = '{$value['name']}'");
    }
    $db2->close();
    $db2->free();*/
    if ($us != '')
        $dop = "AND b.fullname LIKE '%{$us}%'";
    else
        $dop = "";
    $shablon = shablon_load("spisok_user.html");
    $rows = $db_gl->query("SELECT DISTINCT(a.manager), b.fullname FROM dle_users as a 
    LEFT JOIN dle_users as b ON a.manager = b.name
    WHERE a.manager<>'' and a.manager is not null  and b.name is not null $dop LIMIT 15");
    foreach ($rows as $key => $value) {
        $value['fullname'] = "Группа ({$value['fullname']})";
        $value['imagmen'] = true;
        $value['name'] = '';
        $value['adgrup'] = '';
        $value['icon'] = 'groupuser.png';
        $html .= compile_table($shablon, $value);
    }
    if ($us != '')
        $dop = "WHERE name LIKE '%{$us}%'";
    else
        $dop = "";
    $rows = $db_gl->query("SELECT name as fullname, guid as adgrup FROM hv_s_adgrup $dop LIMIT 15");
    foreach ($rows as $key => $value) {
        $value['imagmen'] = true;
        $value['name'] = '';
        $value['manager'] = '';
        $value['icon'] = 'groupad.png';
        $html .= compile_table($shablon, $value);
    }

    return $html;
}

if (isset($_GET['searc'])) {
    if ($_POST['rez']=='user')
    $html = compile_user($_POST['tex']);
    else
    $html = compile_grup($_POST['tex']);
    die($html);
}


?>

<div class="spisinput"><input type="text" id="inpspis" /></div>

<div class="divspis">
    <?php
    if ($_GET['spis'] == 'user') echo compile_user('');
    if ($_GET['spis'] == 'grup') echo compile_grup('');
    ?>
</div>

<div class="footerspis">
<button type="button" data-role="button" data-icon="close-outline" onclick="$('#idspisok').data('kendoWindow').close();">Закрыть</button>
</div>

<script>
    setTimeout(() => {
        $('#inpspis').focus();
    }, 400);
    kendo.init(".footerspis");
    var rez;
    var tim;
    rez = "<?php echo $_GET['spis'];?>";
    $(".spisinput input").on('change, input', function() {
        if (tim) clearTimeout(tim);
        tex = $(this).val();
        tim = setTimeout(() => {
            $.ajax({
                type: 'POST',
                url: '/tpl/spisok.php?searc=ok',
                data: {
                    tex: tex,
                    rez: rez
                },
                // timeout: 300000, // in milliseconds
                success: function(b) {
                    $(".divspis").html(b);
                }
            })
        }, 300);
    })
    $(document).on('click', '.clspis', function() {
        fullname = $(this).find('.spisfullname').text();
        name = $(this).attr('data-name');
        manager = $(this).attr('data-usergrup');
        adgrup = $(this).attr('data-adgrup');

        foto = '';
        if (name !=''){
        if ($('.cldostup[data-user="' + name + '"]')[0])
            return;
        foto = $(this).find('.titavatar').attr('style');
        foto = `<span class="cover titavatar avadostup" style="` + foto + `"></span>`;
        }
        if (manager !=''){
            if ($('.cldostup[data-usergrup="' + manager + '"]')[0])
            return;
        foto = `<img src="/images/dostup/groupuser.png">`;
        }
        if (adgrup !=''){
            if ($('.cldostup[data-adgrup="' + adgrup + '"]')[0])
            return;
        foto = `<img src="/images/dostup/groupad.png">`;
        }
        
        $('#iddostup .dostupitems').append(`
        <div class="cldostup" data-roly="4" , data-user="` + name + `" , data-adgrup="`+adgrup+`" , data-usergrup="`+manager+`">
    <div class="name"><span class="userLink">`+foto+
            fullname + `</span></div>
    <div class="remove">
        <div class="k-icon k-i-close-outline"></div>
    </div>
    <div class="action"><span class="action-clean strel">Чтение</span></div>
</div>
        `);
        $(this).css('display','none');
        dostupknop();
        createmenu();
    });
</script>

<style>
    .clspis {
        display: flex;
        margin-bottom: 5px;
        align-items: center;
        cursor: pointer;
    }

    input#inpspis {
        width: 88%;
        height: 24px;
        /* margin-top: 4px; */
        position: absolute;
        top: 5px;
    }

    div#idspisok {
        overflow: hidden;
    }

    .divspis {
        height: 90%;
        margin-top: 20px;
        overflow-y: auto;
    }
    .imagspis img{
        max-height: 18px;
    margin: 0 5px -4px 0px;
    }
    .footerspis{
        direction: rtl; 
        border-top: 1px solid #cbcbcb;
    padding-top: 2px;  
    }
</style>