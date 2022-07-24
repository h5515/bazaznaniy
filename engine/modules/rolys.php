<?php
$mas_roly = [];
$mas_roly_name = [];

function poluc_roly($id_spis, $categor = "")
{
    global $mas_roly, $mas_roly_name, $db_gl;
    $dop = '';
    if ($categor) {
        $dop = "AND category = '{$categor}'";
    }
    $sql = "SELECT id, name, opisan FROM hv_s_roly WHERE id in({$id_spis}) {$dop} ORDER BY name";
    $rows = $db_gl->query($sql);
    $html = '';
    foreach ($rows as $row) {
        if (!in_array($row['id'], $mas_roly)) {
            $mas_roly[] = $row['id'];
            $mas_roly_name[] = $row['name'];
            $html .= '<li><span class="k-state-grup">' . $row['name'] . '<p>' . $row['opisan'] . '</p></li>';
        }
    }
    return $html;
}
function poluc_roly_po_grup($grup, $categor = '')
{
    global $db_gl;
    $sql = "SELECT * FROM hv_s_grup_roly WHERE id = {$grup}";
    $row = $db_gl->super_query($sql);
    $nam = $row['name'];
    $opisan = $row['opisan'];
    $html = '<li><span class="k-state-grup"><span class="k-sprite folder"></span>Группа (' . $nam . ')<p>' . $opisan . '</p></span><ul>';
    if ($row['id_roly'] != '') {
        $ht = poluc_roly($row['id_roly'], $categor);
    } else $ht = '';
    $html .= $ht;
    $html .= '</li></ul></li>';
    if ($ht == '') $html = "";
    return $html;
}

function poluc_grup_and_roly($grup, $roly, $categor = "")
{
    $html = '';
    $ht = '';
    $hts = '';
    if ((isset($grup)) && ($grup != "")) {
        $gr_rolys = explode(',', $grup);
        foreach ($gr_rolys as $gr) {
            $ht .= poluc_roly_po_grup($gr, $categor);
        }
        $html .= $ht;
    }
    if ((isset($roly)) && ($roly != "")) {
        $html .= '<li><span class="k-state-grup"><span class="k-sprite folder"></span>Роли</span><ul>';
        $hts .= poluc_roly($roly, $categor);
        $html .= $hts;
        $html .= '</li></ul></li>';
    }
    return $html;
}

function poluc_roly_user($login, $categor = "")
{
    global $db_gl;
    $sql = "SELECT id_roly, id_grup_roly FROM hv_s_dostup WHERE id_pls = '{$login}' AND rezim='user'";
    $rows = $db_gl->super_query($sql);
    $html = '<li><span class="k-state-grup"><span class="k-sprite folder"></span>Пользователь (' . $login . ')</span><ul>';
    $ht = poluc_grup_and_roly($rows['id_grup_roly'], $rows['id_roly'], $categor);
    $html .= $ht;
    $html .= '</li></ul></li>';
    if ($ht == '') $html = "";
    return $html;
}

function poluc_roly_grupldap($login, $categor)
{
    global $db_gl;
    $sql = "SELECT grups FROM dle_users WHERE name='{$login}'";
    $row = $db_gl->super_query($sql);
    $ht = '';
    $html = '';
    $prover = explode(',', $row['grups']);
    foreach ($prover as $key => $value) {
        if (!is_numeric($value)) {
            $row['grups'] = '';
            break;
        }
    }
    $gudgrup = explode(',', $row['grups']);
    $strgrup = '';
    $db2 = new db;
    $db2->connect(DBUSER, DBPASS, DBGNAME, DBHOST);
    foreach ($gudgrup as $key => $value) {
        if ($value != '') {
            $value = $db2->super_query("SELECT guid FROM hv_s_adgrup WHERE id = $value")['guid'];
            $strgrup .= "'" . $value . "',";
        }
    }
    $db2->close();
    $db2->free();
    if ($strgrup != '') {
        $strgrup = substr($strgrup, 0, -1);
    }
    if ($row['grups']) {
        $sql = "SELECT id_pls, id_roly, id_grup_roly, a.name FROM hv_s_dostup LEFT JOIN hv_s_adgrup as a ON id_pls=a.guid WHERE id_pls in ($strgrup) AND rezim='grup_ldap'";
        $rows = $db_gl->query($sql);
        foreach ($rows as $row) {
            $htm = '<li><span class="k-state-grup"><span class="k-sprite folder"></span>Группа_LDAP (' . $row['name'] . ')</span><ul>';
            $ht = poluc_grup_and_roly($row['id_grup_roly'], $row['id_roly'], $categor);
            $htm .= $ht;
            $htm .= '</li></ul></li>';
            if ($ht == '') $htm = "";
            $html .= $htm;
        }
    }
    return $html;
}


function poluc_roly_gruphv($login, $categor = "")
{
    global $db_gl;
    $db2 = new db;
    $db2->connect(DBUSER, DBPASS, DBGNAME, DBHOST);
    $sql = "SELECT name, manager FROM dle_users WHERE name='{$login}'";
    $row = $db_gl->super_query($sql);
    $ht = '';
    $dpr = '';
    $html = '';
    if (isset($row['manager'])) {
        $dpr = "OR id_pls = '{$row['manager']}'";
    }
    $sql = "SELECT id_pls, id_roly, id_grup_roly FROM hv_s_dostup WHERE (id_pls = '{$row['name']}' {$dpr}) AND rezim='grup_hv'";
    $rows = $db_gl->query($sql);
    foreach ($rows as $row) {
        $fulln = $db2->super_query("SELECT fullname FROM dle_users WHERE name = '{$row['id_pls']}'");
        $htm = '<li><span class="k-state-grup"><span class="k-sprite folder"></span>Группа_HV (' . $fulln['fullname'] . ')</span><ul>';
        $ht = poluc_grup_and_roly($row['id_grup_roly'], $row['id_roly'], $categor);
        $htm .= $ht;
        $htm .= '</li></ul></li>';
        if ($ht == '') $htm = "";
        $html .= $htm;
    }
    $db2->close();
    $db2->free();
    return $html;
}

function compile_report_rolys($login, $categor = '')
{
    $html = '<ul id="treedostups">';
    $html .= poluc_roly_po_grup(4, $categor);
    $html .= poluc_roly_user($login, $categor);
    $html .= poluc_roly_gruphv($login, $categor);
    $html .= poluc_roly_grupldap($login, $categor);
    $html .= '</ul>';

    return $html;
}