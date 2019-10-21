<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* partials/dashboard-pages.html.twig */
class __TwigTemplate_f4aa0b8ecc8cbd1a04906b8a050c78d7c0ef830556dd72dbe8e3f6c543ce3049 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.pages", 1 => "admin.super"])) {
            // line 2
            echo "    <div id=\"latest\">
        <div class=\"button-bar\">
            <a class=\"button\" href=\"";
            // line 4
            echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
            echo "/pages\"><i class=\"fa fa-fw fa-file-text-o\"></i>";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.MANAGE_PAGES"), "html", null, true);
            echo "</a>
        </div>
        <h1>";
            // line 6
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.LATEST_PAGE_UPDATES"), "html", null, true);
            echo "</h1>
        <table>
        ";
            // line 8
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["admin"] ?? null), "latestPages", []));
            foreach ($context['_seq'] as $context["_key"] => $context["latest"]) {
                if ($this->getAttribute(($context["admin"] ?? null), "latestPages", [])) {
                    // line 9
                    echo "            <tr>
                <td class=\"triple page-title\">
                    <a href=\"";
                    // line 11
                    echo twig_escape_filter($this->env, ($context["base_url"] ?? null), "html", null, true);
                    echo "/pages/";
                    echo twig_escape_filter($this->env, twig_trim_filter($this->getAttribute($context["latest"], "route", []), "/"), "html", null, true);
                    echo "\"><i class=\"fa fa-fw fa-file-text-o\"></i> ";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["latest"], "title", []));
                    echo "</a></td>
                <td class=\"triple page-route\">";
                    // line 12
                    echo twig_escape_filter($this->env, $this->getAttribute($context["latest"], "route", []), "html", null, true);
                    echo "</td><td>";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->adminNicetimeFilter($this->getAttribute($context["latest"], "modified", [])), "html", null, true);
                    echo "</td>
            </tr>
        ";
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['latest'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 15
            echo "        </table>
    </div>
";
        } else {
            // line 18
            echo "    <div class=\"padding\">You don't have sufficient access to view the dashboard...</div>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/dashboard-pages.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  82 => 18,  77 => 15,  65 => 12,  57 => 11,  53 => 9,  48 => 8,  43 => 6,  36 => 4,  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/dashboard-pages.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/dashboard-pages.html.twig");
    }
}
