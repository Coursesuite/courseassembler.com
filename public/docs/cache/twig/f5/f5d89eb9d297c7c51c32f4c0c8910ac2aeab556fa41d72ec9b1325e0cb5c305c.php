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

/* partials/nav.html.twig */
class __TwigTemplate_a2a9067ddfa5c8e74a44ec713fdfda8a7940894c3ffe8d5ba35404a8f7c2e533 extends \Twig\Template
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
        $context["nav_hover"] = ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "sidebar", []), "activate", []) == "hover");
        // line 2
        if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.login", 1 => "admin.super"])) {
            // line 3
            echo "    <nav id=\"admin-sidebar\" data-quickopen=\"";
            echo ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "sidebar", []), "activate", []) == "hover")) ? ("true") : ("false"));
            echo "\" data-quickopen-delay=\"";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "sidebar", []), "hover_delay", []), "html", null, true);
            echo "\">

        <div id=\"admin-logo\" class=\"";
            // line 5
            echo ((($context["nav_hover"] ?? null)) ? ("nav-hover") : (""));
            echo "\">
            ";
            // line 6
            if ( !($context["nav_hover"] ?? null)) {
                // line 7
                echo "                <div id=\"open-handle\" data-sidebar-toggle><i class=\"fa fa-angle-right\"></i></div>
            ";
            }
            // line 9
            echo "            ";
            $this->loadTemplate("partials/logo.html.twig", "partials/nav.html.twig", 9)->display($context);
            // line 10
            echo "        </div>

        ";
            // line 12
            $this->loadTemplate("partials/nav-user-details.html.twig", "partials/nav.html.twig", 12)->display($context);
            // line 13
            echo "
        ";
            // line 14
            $this->loadTemplate("partials/nav-quick-tray.html.twig", "partials/nav.html.twig", 14)->display($context);
            // line 15
            echo "
        <div class=\"admin-menu-wrapper\">
            <ul id=\"admin-menu\">
                <li class=\"";
            // line 18
            echo (((($context["location"] ?? null) == "dashboard")) ? ("selected") : (""));
            echo "\">
                    <a href=\"";
            // line 19
            echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
            echo "\"><i class=\"fa fa-fw fa-th\"></i><em>";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.DASHBOARD"), "html", null, true);
            echo "</em></a>
                </li>
                ";
            // line 21
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.configuration", 1 => "admin.super"])) {
                // line 22
                echo "                    <li class=\"";
                echo (((((($context["location"] ?? null) == "system") || (($context["location"] ?? null) == "site")) || (($context["location"] ?? null) == "config"))) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 23
                echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                echo "/config/";
                echo (($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.configuration_system"])) ? ("system") : ("site"));
                echo "\"><i class=\"fa fa-fw fa-wrench\"></i><em>";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONFIGURATION"), "html", null, true);
                echo "</em></a>
                    </li>
                ";
            }
            // line 26
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.pages", 1 => "admin.super"])) {
                // line 27
                echo "                    <li class=\"";
                echo (((($context["location"] ?? null) == "pages")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 28
                echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                echo "/pages\">
                            <i class=\"fa fa-fw fa-file-text-o\"></i>
                            <em>";
                // line 30
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PAGES"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge count\">";
                // line 32
                echo twig_escape_filter($this->env, $this->getAttribute(($context["admin"] ?? null), "pagesCount", []), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 37
            echo "                ";
            if ($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "twig", []), "plugins_hooked_nav", [])) {
                // line 38
                echo "                    ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "twig", []), "plugins_hooked_nav", []));
                foreach ($context['_seq'] as $context["label"] => $context["item"]) {
                    // line 39
                    echo "                        ";
                    if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize(((($this->getAttribute($context["item"], "authorize", [], "any", true, true) && twig_test_iterable($this->getAttribute($context["item"], "authorize", [])))) ? ($this->getAttribute($context["item"], "authorize", [])) : ([0 => (($this->getAttribute($context["item"], "authorize", [])) ? ($this->getAttribute($context["item"], "authorize", [])) : (("admin." . (($this->getAttribute($context["item"], "location", [])) ? ($this->getAttribute($context["item"], "location", [])) : ($this->getAttribute($context["item"], "route", [])))))), 1 => "admin.super"])))) {
                        // line 40
                        echo "                            <li class=\"";
                        echo (((($context["location"] ?? null) == (($this->getAttribute($context["item"], "location", [])) ? ($this->getAttribute($context["item"], "location", [])) : ($this->getAttribute($context["item"], "route", []))))) ? ("selected") : (""));
                        echo "\">
                                <a href=\"";
                        // line 41
                        echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                        echo "/";
                        echo twig_escape_filter($this->env, (($this->getAttribute($context["item"], "route", [])) ? ($this->getAttribute($context["item"], "route", [])) : ($this->getAttribute($context["item"], "location", []))), "html", null, true);
                        echo "\">
                                    <i class=\"fa fa-fw ";
                        // line 42
                        echo twig_escape_filter($this->env, $this->getAttribute($context["item"], "icon", []), "html", null, true);
                        echo "\"></i>
                                    <em>";
                        // line 43
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($context["label"]), "html", null, true);
                        echo "</em>
                                    ";
                        // line 44
                        if ($this->getAttribute($context["item"], "badge", [])) {
                            // line 45
                            echo "                                    <span class=\"badges ";
                            if ($this->getAttribute($this->getAttribute($context["item"], "badge", [], "any", false, true), "updates", [], "any", true, true)) {
                                echo "with-updates";
                            }
                            echo "\">
                                        ";
                            // line 46
                            if ($this->getAttribute($this->getAttribute($context["item"], "badge", [], "any", false, true), "updates", [], "any", true, true)) {
                                echo "<span class=\"badge updates\">";
                                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($context["item"], "badge", []), "updates", []), "html", null, true);
                                echo "</span>";
                            }
                            // line 47
                            echo "                                        <span class=\"badge count\">";
                            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($context["item"], "badge", []), "count", []), "html", null, true);
                            echo "</span>
                                    </span>
                                    ";
                        }
                        // line 50
                        echo "                                </a>
                            </li>
                        ";
                    }
                    // line 53
                    echo "                    ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['label'], $context['item'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 54
                echo "                ";
            }
            // line 55
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.plugins", 1 => "admin.super"])) {
                // line 56
                echo "                    <li class=\"";
                echo (((($context["location"] ?? null) == "plugins")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 57
                echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                echo "/plugins\">
                            <i class=\"fa fa-fw fa-plug\"></i>
                            <em>";
                // line 59
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PLUGINS"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">";
                // line 62
                echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute(($context["admin"] ?? null), "plugins", [])), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 67
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.themes", 1 => "admin.super"])) {
                // line 68
                echo "                    <li class=\"";
                echo (((($context["location"] ?? null) == "themes")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 69
                echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                echo "/themes\">
                            <i class=\"fa fa-fw fa-tint\"></i>
                            <em>";
                // line 71
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.THEMES"), "html", null, true);
                echo "</em>
                            <span class=\"badges\">
                                <span class=\"badge updates\"></span>
                                <span class=\"badge count\">";
                // line 74
                echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute(($context["admin"] ?? null), "themes", [])), "html", null, true);
                echo "</span>
                            </span>
                        </a>
                    </li>
                ";
            }
            // line 79
            echo "                ";
            if ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize($this->getAttribute(($context["admin"] ?? null), "toolsPermissions", []))) {
                // line 80
                echo "                    <li class=\"";
                echo (((($context["location"] ?? null) == "tools")) ? ("selected") : (""));
                echo "\">
                        <a href=\"";
                // line 81
                echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
                echo "/tools\">
                            <i class=\"fa fa-fw fa-briefcase\"></i>
                            <em>";
                // line 83
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.TOOLS"), "html", null, true);
                echo "</em>
                        </a>
                    </li>
                ";
            }
            // line 87
            echo "
                ";
            // line 88
            $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 = null;
            try {
                $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4 =                 $this->loadTemplate("partials/nav-pro.html.twig", "partials/nav.html.twig", 88);
            } catch (LoaderError $e) {
                // ignore missing template
            }
            if ($__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4) {
                $__internal_f607aeef2c31a95a7bf963452dff024ffaeb6aafbe4603f9ca3bec57be8633f4->display($context);
            }
            // line 89
            echo "
                <li>
                    <a href=\"";
            // line 91
            echo twig_escape_filter($this->env, $this->getAttribute(($context["uri"] ?? null), "addNonce", [0 => (((($context["base_url_relative"] ?? null) . "/task") . $this->getAttribute($this->getAttribute(($context["config"] ?? null), "system", []), "param_sep", [])) . "logout"), 1 => "logout-form", 2 => "logout-nonce"], "method"), "html", null, true);
            echo "\"><i class=\"fa fa-fw fa-sign-out\"></i><em>";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.LOGOUT"), "html", null, true);
            echo "</em></a>
                </li>
            </ul>
        </div>
    </nav>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/nav.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  282 => 91,  278 => 89,  268 => 88,  265 => 87,  258 => 83,  253 => 81,  248 => 80,  245 => 79,  237 => 74,  231 => 71,  226 => 69,  221 => 68,  218 => 67,  210 => 62,  204 => 59,  199 => 57,  194 => 56,  191 => 55,  188 => 54,  182 => 53,  177 => 50,  170 => 47,  164 => 46,  157 => 45,  155 => 44,  151 => 43,  147 => 42,  141 => 41,  136 => 40,  133 => 39,  128 => 38,  125 => 37,  117 => 32,  112 => 30,  107 => 28,  102 => 27,  99 => 26,  89 => 23,  84 => 22,  82 => 21,  75 => 19,  71 => 18,  66 => 15,  64 => 14,  61 => 13,  59 => 12,  55 => 10,  52 => 9,  48 => 7,  46 => 6,  42 => 5,  34 => 3,  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/nav.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/nav.html.twig");
    }
}
