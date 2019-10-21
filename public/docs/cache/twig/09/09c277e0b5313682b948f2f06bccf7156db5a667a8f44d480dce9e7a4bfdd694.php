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

/* partials/nav-quick-tray.html.twig */
class __TwigTemplate_6cd9d8021fd73caa1fdc8ebdde411b0c89b0ea524a6c4cdd4625ffdb6467f1ba extends \Twig\Template
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
        $context["clear_cache_url"] = (((($context["base_url_relative"] ?? null) . "/cache.json/task") . $this->getAttribute($this->getAttribute(($context["config"] ?? null), "system", []), "param_sep", [])) . twig_escape_filter($this->env, "clearCache", "html_attr"));
        // line 2
        echo "<ul id=\"admin-nav-quick-tray\">
    ";
        // line 3
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.maintenance", 1 => "admin.super", 2 => "admin.cache"])) {
            // line 4
            echo "    <li class=\"hint--bottom\" data-hint=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLEAR_CACHE"), "html", null, true);
            echo "\">
        <a data-clear-cache-type=\"\" data-clear-cache=\"";
            // line 5
            echo twig_escape_filter($this->env, $this->getAttribute(($context["uri"] ?? null), "addNonce", [0 => ($context["clear_cache_url"] ?? null), 1 => "admin-form", 2 => "admin-nonce"], "method"), "html", null, true);
            echo "\">
            <i class=\"fa fa-trash\"></i>
        </a>
    </li>
    ";
        }
        // line 10
        echo "    ";
        if ($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "twig", []), "plugins_quick_tray", [])) {
            // line 11
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "twig", []), "plugins_quick_tray", []));
            foreach ($context['_seq'] as $context["label"] => $context["item"]) {
                // line 12
                echo "        ";
                if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(((($this->getAttribute($context["item"], "authorize", [], "any", true, true) && twig_test_iterable($this->getAttribute($context["item"], "authorize", [])))) ? ($this->getAttribute($context["item"], "authorize", [])) : ([0 => (($this->getAttribute($context["item"], "authorize", [])) ? ($this->getAttribute($context["item"], "authorize", [])) : (("admin." . (($this->getAttribute($context["item"], "location", [])) ? ($this->getAttribute($context["item"], "location", [])) : ($this->getAttribute($context["item"], "route", [])))))), 1 => "admin.super"])))) {
                    // line 13
                    echo "            ";
                    $context["data_tags"] = "";
                    // line 14
                    echo "            ";
                    if ($this->getAttribute($context["item"], "data", [])) {
                        // line 15
                        echo "                ";
                        $context['_parent'] = $context;
                        $context['_seq'] = twig_ensure_traversable($this->getAttribute($context["item"], "data", []));
                        foreach ($context['_seq'] as $context["key"] => $context["value"]) {
                            // line 16
                            echo "                    ";
                            $context["data_tags"] = (((((($context["data_tags"] ?? null) . " data-") . $context["key"]) . "=\"") . $context["value"]) . "\"");
                            // line 17
                            echo "                ";
                        }
                        $_parent = $context['_parent'];
                        unset($context['_seq'], $context['_iterated'], $context['key'], $context['value'], $context['_parent'], $context['loop']);
                        $context = array_intersect_key($context, $_parent) + $_parent;
                        // line 18
                        echo "            ";
                    }
                    // line 19
                    echo "            <li class=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "class", []), "html", null, true);
                    echo " hint--bottom\" data-hint=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "hint", []), "html", null, true);
                    echo "\" ";
                    echo ($context["data_tags"] ?? null);
                    echo ">
            ";
                    // line 20
                    if ($this->getAttribute($context["item"], "route", [])) {
                        // line 21
                        echo "                <a href=\"";
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->urlFunc($this->getAttribute($context["item"], "route", [])), "html", null, true);
                        echo "\">
                    <i class=\"fa fa-fw ";
                        // line 22
                        echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "icon", []), "html", null, true);
                        echo "\"></i>
                </a>
            ";
                    } else {
                        // line 25
                        echo "                <i class=\"fa fa-fw ";
                        echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "icon", []), "html", null, true);
                        echo "\"></i>
            ";
                    }
                    // line 27
                    echo "            </li>
        ";
                }
                // line 29
                echo "    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['label'], $context['item'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 30
            echo "    ";
        } else {
            // line 31
            echo "        ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.maintenance", 1 => "admin.super"])) {
                // line 32
                echo "        <li class=\"hint--bottom\" data-hint=\"Add the 'quick-tray-links' plugin for more...\">
            <a href=\"";
                // line 33
                echo twig_escape_filter($this->env, (($context["base_url_relative"] ?? null) . "/plugins/install"), "html", null, true);
                echo "\">
                <i class=\"fa fa-plus\"></i>
            </a>
        </li>
        ";
            }
            // line 38
            echo "    ";
        }
        // line 39
        echo "</ul>

";
    }

    public function getTemplateName()
    {
        return "partials/nav-quick-tray.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  142 => 39,  139 => 38,  131 => 33,  128 => 32,  125 => 31,  122 => 30,  116 => 29,  112 => 27,  106 => 25,  100 => 22,  95 => 21,  93 => 20,  84 => 19,  81 => 18,  75 => 17,  72 => 16,  67 => 15,  64 => 14,  61 => 13,  58 => 12,  53 => 11,  50 => 10,  42 => 5,  37 => 4,  35 => 3,  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/nav-quick-tray.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/nav-quick-tray.html.twig");
    }
}
