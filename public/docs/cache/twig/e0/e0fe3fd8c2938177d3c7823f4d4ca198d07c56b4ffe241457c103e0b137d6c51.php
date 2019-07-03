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

/* partials/base.html.twig */
class __TwigTemplate_49217d327299585a24f9750f1f068a5e12bbdcee0c74c604d9559dff6ea7589d extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'head' => [$this, 'block_head'],
            'stylesheets' => [$this, 'block_stylesheets'],
            'javascripts' => [$this, 'block_javascripts'],
            'sidebar' => [$this, 'block_sidebar'],
            'body' => [$this, 'block_body'],
            'topbar' => [$this, 'block_topbar'],
            'content' => [$this, 'block_content'],
            'footer' => [$this, 'block_footer'],
            'navigation' => [$this, 'block_navigation'],
            'analytics' => [$this, 'block_analytics'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        $context["theme_config"] = $this->getAttribute($this->getAttribute(($context["config"] ?? null), "themes", []), $this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "system", []), "pages", []), "theme", []));
        // line 2
        $context["github_link_position"] = (((isset($context["github_link_position"]) || array_key_exists("github_link_position", $context))) ? (($context["github_link_position"] ?? null)) : ($this->getAttribute($this->getAttribute(($context["theme_config"] ?? null), "github", []), "position", [])));
        // line 3
        echo "<!DOCTYPE html>
<html lang=\"";
        // line 4
        echo (($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", []), "getLanguage", [])) ? ($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", []), "getLanguage", [])) : ("en"));
        echo "\">
<head>
    ";
        // line 6
        $this->displayBlock('head', $context, $blocks);
        // line 42
        echo "</head>
<body class=\"searchbox-hidden ";
        // line 43
        echo $this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "body_classes", []);
        echo "\" data-url=\"";
        echo $this->getAttribute(($context["page"] ?? null), "route", []);
        echo "\">
    ";
        // line 44
        $this->displayBlock('sidebar', $context, $blocks);
        // line 55
        echo "
    ";
        // line 56
        $this->displayBlock('body', $context, $blocks);
        // line 89
        echo "    ";
        $this->displayBlock('analytics', $context, $blocks);
        // line 94
        echo " </body>
</html>
";
    }

    // line 6
    public function block_head($context, array $blocks = [])
    {
        // line 7
        echo "    <meta charset=\"utf-8\" />
    <title>";
        // line 8
        if ($this->getAttribute(($context["header"] ?? null), "title", [])) {
            echo $this->getAttribute(($context["header"] ?? null), "title", []);
            echo " | ";
        }
        echo $this->getAttribute(($context["site"] ?? null), "title", []);
        echo "</title>
    ";
        // line 9
        $this->loadTemplate("partials/metadata.html.twig", "partials/base.html.twig", 9)->display($context);
        // line 10
        echo "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no\" />
    <link rel=\"alternate\" type=\"application/atom+xml\" href=\"";
        // line 11
        echo ($context["base_url_absolute"] ?? null);
        echo "/feed:atom\" title=\"Atom Feed\" />
    <link rel=\"alternate\" type=\"application/rss+xml\" href=\"";
        // line 12
        echo ($context["base_url_absolute"] ?? null);
        echo "/feed:rss\" title=\"RSS Feed\" />
    <link rel=\"icon\" type=\"image/png\" href=\"";
        // line 13
        echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->urlFunc("theme://images/favicon.png");
        echo "\">

    ";
        // line 15
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 30
        echo "
    ";
        // line 31
        $this->displayBlock('javascripts', $context, $blocks);
        // line 40
        echo "
    ";
    }

    // line 15
    public function block_stylesheets($context, array $blocks = [])
    {
        // line 16
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css-compiled/nucleus.css", 1 => 102], "method");
        // line 17
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css-compiled/theme.css", 1 => 101], "method");
        // line 18
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css/custom.css", 1 => 100], "method");
        // line 19
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css/font-awesome.min.css", 1 => 100], "method");
        // line 20
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css/featherlight.min.css"], "method");
        // line 21
        echo "
        ";
        // line 22
        if (((($this->getAttribute(($context["browser"] ?? null), "getBrowser", []) == "msie") && ($this->getAttribute(($context["browser"] ?? null), "getVersion", []) >= 8)) && ($this->getAttribute(($context["browser"] ?? null), "getVersion", []) <= 9))) {
            // line 23
            echo "            ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css/nucleus-ie9.css"], "method");
            // line 24
            echo "            ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => "theme://css/pure-0.5.0/grids-min.css"], "method");
            // line 25
            echo "            ";
            $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/html5shiv-printshiv.min.js"], "method");
            // line 26
            echo "        ";
        }
        // line 27
        echo "
        ";
        // line 28
        echo $this->getAttribute(($context["assets"] ?? null), "css", [], "method");
        echo "
    ";
    }

    // line 31
    public function block_javascripts($context, array $blocks = [])
    {
        // line 32
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "jquery", 1 => 101], "method");
        // line 33
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/modernizr.custom.71422.js", 1 => 100], "method");
        // line 34
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/featherlight.min.js"], "method");
        // line 35
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/clipboard.min.js"], "method");
        // line 36
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/jquery.scrollbar.min.js"], "method");
        // line 37
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/learn.js"], "method");
        // line 38
        echo "        ";
        echo $this->getAttribute(($context["assets"] ?? null), "js", [], "method");
        echo "
    ";
    }

    // line 44
    public function block_sidebar($context, array $blocks = [])
    {
        // line 45
        echo "    <nav id=\"sidebar\">
        <div id=\"header-wrapper\">
            <div id=\"header\">
                <a id=\"logo\" href=\"";
        // line 48
        echo (($this->getAttribute(($context["theme_config"] ?? null), "home_url", [])) ? ($this->getAttribute(($context["theme_config"] ?? null), "home_url", [])) : (($context["base_url_absolute"] ?? null)));
        echo "\">";
        $this->loadTemplate("partials/logo.html.twig", "partials/base.html.twig", 48)->display($context);
        echo "</a>
                ";
        // line 49
        $this->loadTemplate("partials/search.html.twig", "partials/base.html.twig", 49)->display($context);
        // line 50
        echo "            </div>
        </div>
        ";
        // line 52
        $this->loadTemplate("partials/sidebar.html.twig", "partials/base.html.twig", 52)->display($context);
        // line 53
        echo "    </nav>
    ";
    }

    // line 56
    public function block_body($context, array $blocks = [])
    {
        // line 57
        echo "    <section id=\"body\">
        <div id=\"overlay\"></div>

        <div class=\"padding highlightable\">
            <a href=\"#\" id=\"sidebar-toggle\" data-sidebar-toggle><i class=\"fa fa-2x fa-bars\"></i></a>

            ";
        // line 63
        $this->displayBlock('topbar', $context, $blocks);
        // line 76
        echo "
            ";
        // line 77
        $this->displayBlock('content', $context, $blocks);
        // line 78
        echo "
            ";
        // line 79
        $this->displayBlock('footer', $context, $blocks);
        // line 84
        echo "
        </div>
        ";
        // line 86
        $this->displayBlock('navigation', $context, $blocks);
        // line 87
        echo "    </section>
    ";
    }

    // line 63
    public function block_topbar($context, array $blocks = [])
    {
        if (((($context["github_link_position"] ?? null) == "top") || $this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "breadcrumbs", []), "enabled", []))) {
            // line 64
            echo "            <div id=\"top-bar\">
                ";
            // line 65
            if ((($context["github_link_position"] ?? null) == "top")) {
                // line 66
                echo "                <div id=\"top-github-link\">
                ";
                // line 67
                $this->loadTemplate("partials/github_link.html.twig", "partials/base.html.twig", 67)->display($context);
                // line 68
                echo "                </div>
                ";
            }
            // line 70
            echo "
                ";
            // line 71
            if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "breadcrumbs", []), "enabled", [])) {
                // line 72
                echo "                ";
                $this->loadTemplate("partials/breadcrumbs.html.twig", "partials/base.html.twig", 72)->display($context);
                // line 73
                echo "                ";
            }
            // line 74
            echo "            </div>
            ";
        }
    }

    // line 77
    public function block_content($context, array $blocks = [])
    {
    }

    // line 79
    public function block_footer($context, array $blocks = [])
    {
        // line 80
        echo "                ";
        if ((($context["github_link_position"] ?? null) == "bottom")) {
            // line 81
            echo "                ";
            $this->loadTemplate("partials/github_note.html.twig", "partials/base.html.twig", 81)->display($context);
            // line 82
            echo "                ";
        }
        // line 83
        echo "            ";
    }

    // line 86
    public function block_navigation($context, array $blocks = [])
    {
    }

    // line 89
    public function block_analytics($context, array $blocks = [])
    {
        // line 90
        echo "        ";
        if ($this->getAttribute(($context["theme_config"] ?? null), "google_analytics_code", [])) {
            // line 91
            echo "        ";
            $this->loadTemplate("partials/analytics.html.twig", "partials/base.html.twig", 91)->display($context);
            // line 92
            echo "        ";
        }
        // line 93
        echo "    ";
    }

    public function getTemplateName()
    {
        return "partials/base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  329 => 93,  326 => 92,  323 => 91,  320 => 90,  317 => 89,  312 => 86,  308 => 83,  305 => 82,  302 => 81,  299 => 80,  296 => 79,  291 => 77,  285 => 74,  282 => 73,  279 => 72,  277 => 71,  274 => 70,  270 => 68,  268 => 67,  265 => 66,  263 => 65,  260 => 64,  256 => 63,  251 => 87,  249 => 86,  245 => 84,  243 => 79,  240 => 78,  238 => 77,  235 => 76,  233 => 63,  225 => 57,  222 => 56,  217 => 53,  215 => 52,  211 => 50,  209 => 49,  203 => 48,  198 => 45,  195 => 44,  188 => 38,  185 => 37,  182 => 36,  179 => 35,  176 => 34,  173 => 33,  170 => 32,  167 => 31,  161 => 28,  158 => 27,  155 => 26,  152 => 25,  149 => 24,  146 => 23,  144 => 22,  141 => 21,  138 => 20,  135 => 19,  132 => 18,  129 => 17,  126 => 16,  123 => 15,  118 => 40,  116 => 31,  113 => 30,  111 => 15,  106 => 13,  102 => 12,  98 => 11,  95 => 10,  93 => 9,  85 => 8,  82 => 7,  79 => 6,  73 => 94,  70 => 89,  68 => 56,  65 => 55,  63 => 44,  57 => 43,  54 => 42,  52 => 6,  47 => 4,  44 => 3,  42 => 2,  40 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/base.html.twig", "/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/themes/learn2/templates/partials/base.html.twig");
    }
}
