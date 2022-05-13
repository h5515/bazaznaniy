<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* sql/detailed_table.twig */
class __TwigTemplate_7fea6aead39dbe8436bd5aff3f438978dd33afe27d291aae4e3d26f7e18640a5 extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<tr>
  <td>";
        // line 2
        echo twig_escape_filter($this->env, ($context["index"] ?? null), "html", null, true);
        echo "</td>
  <td>";
        // line 3
        echo twig_escape_filter($this->env, twig_title_string_filter($this->env, ($context["status"] ?? null)), "html", null, true);
        echo "</td>
  <td class=\"right\">
    ";
        // line 5
        echo twig_escape_filter($this->env, PhpMyAdmin\Util::formatNumber(($context["duration"] ?? null), 3, 1), "html", null, true);
        echo "s
    <span class=\"rawvalue hide\">";
        // line 6
        echo twig_escape_filter($this->env, ($context["duration"] ?? null), "html", null, true);
        echo "</span>
  </td>
</tr>
";
    }

    public function getTemplateName()
    {
        return "sql/detailed_table.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  53 => 6,  49 => 5,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "sql/detailed_table.twig", "C:\\server\\data\\htdocs\\phpmyadmin\\templates\\sql\\detailed_table.twig");
    }
}
