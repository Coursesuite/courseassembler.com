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
class __TwigTemplate_1f9f5b102a277ce49e7c10a8b1ad7af7bf1bd0ab4bec311dc662a2449f573f63 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'head' => [$this, 'block_head'],
            'stylesheets' => [$this, 'block_stylesheets'],
            'javascripts' => [$this, 'block_javascripts'],
            'assets' => [$this, 'block_assets'],
            'sidebar' => [$this, 'block_sidebar'],
            'body' => [$this, 'block_body'],
            'topbar' => [$this, 'block_topbar'],
            'content' => [$this, 'block_content'],
            'footer' => [$this, 'block_footer'],
            'navigation' => [$this, 'block_navigation'],
            'analytics' => [$this, 'block_analytics'],
            'bottom' => [$this, 'block_bottom'],
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
        echo (($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", []), "getActive", [])) ? ($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "language", []), "getActive", [])) : ($this->getAttribute($this->getAttribute($this->getAttribute(($context["grav"] ?? null), "config", []), "site", []), "default_lang", [])));
        echo "\">
<head>
";
        // line 6
        $this->displayBlock('head', $context, $blocks);
        // line 44
        echo "</head>
<body class=\"searchbox-hidden ";
        // line 45
        echo $this->getAttribute($this->getAttribute(($context["page"] ?? null), "header", []), "body_classes", []);
        echo "\" data-url=\"";
        echo $this->getAttribute(($context["page"] ?? null), "route", []);
        echo "\">
    ";
        // line 46
        $this->displayBlock('sidebar', $context, $blocks);
        // line 57
        echo "
    ";
        // line 58
        $this->displayBlock('body', $context, $blocks);
        // line 91
        echo "
    ";
        // line 92
        $this->displayBlock('analytics', $context, $blocks);
        // line 97
        echo "
    ";
        // line 98
        $this->displayBlock('bottom', $context, $blocks);
        // line 101
        echo " </body>
</html>
";
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->resolve($this, $context, $blocks);
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
        // line 28
        echo "
    ";
        // line 29
        $this->displayBlock('javascripts', $context, $blocks);
        // line 37
        echo "
    ";
        // line 38
        $this->displayBlock('assets', $context, $blocks);
        // line 42
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
        echo "    ";
    }

    // line 29
    public function block_javascripts($context, array $blocks = [])
    {
        // line 30
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "jquery", 1 => 101], "method");
        // line 31
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/modernizr.custom.71422.js", 1 => 100], "method");
        // line 32
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/featherlight.min.js"], "method");
        // line 33
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/clipboard.min.js"], "method");
        // line 34
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/jquery.scrollbar.min.js"], "method");
        // line 35
        echo "        ";
        $this->getAttribute(($context["assets"] ?? null), "addJs", [0 => "theme://js/learn.js"], "method");
        // line 36
        echo "    ";
    }

    public function block_assets($context, array $blocks = array())
    {
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->defer($this, 'assets');
    }

    // line 38
    public function block_assets_deferred($context, array $blocks = array())
    {
        // line 39
        echo "    ";
        echo $this->getAttribute(($context["assets"] ?? null), "css", [], "method");
        echo "
    ";
        // line 40
        echo $this->getAttribute(($context["assets"] ?? null), "js", [], "method");
        echo "
  ";
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->resolve($this, $context, $blocks);
    }

    // line 46
    public function block_sidebar($context, array $blocks = [])
    {
        // line 47
        echo "    <nav id=\"sidebar\">
        <div id=\"header-wrapper\">
            <div id=\"header\">
                <a id=\"logo\" href=\"";
        // line 50
        echo (($this->getAttribute(($context["theme_config"] ?? null), "home_url", [])) ? ($this->getAttribute(($context["theme_config"] ?? null), "home_url", [])) : (($context["base_url_absolute"] ?? null)));
        echo "\">";
        $this->loadTemplate("partials/logo.html.twig", "partials/base.html.twig", 50)->display($context);
        echo "</a>
                ";
        // line 51
        $this->loadTemplate("partials/search.html.twig", "partials/base.html.twig", 51)->display($context);
        // line 52
        echo "            </div>
        </div>
        ";
        // line 54
        $this->loadTemplate("partials/sidebar.html.twig", "partials/base.html.twig", 54)->display($context);
        // line 55
        echo "    </nav>
    ";
    }

    // line 58
    public function block_body($context, array $blocks = [])
    {
        // line 59
        echo "    <section id=\"body\">
        <div id=\"overlay\"></div>

        <div class=\"padding highlightable\">
            <a href=\"#\" id=\"sidebar-toggle\" data-sidebar-toggle><i class=\"fa fa-2x fa-bars\"></i></a>

            ";
        // line 65
        $this->displayBlock('topbar', $context, $blocks);
        // line 78
        echo "
            ";
        // line 79
        $this->displayBlock('content', $context, $blocks);
        // line 80
        echo "
            ";
        // line 81
        $this->displayBlock('footer', $context, $blocks);
        // line 86
        echo "
        </div>
        ";
        // line 88
        $this->displayBlock('navigation', $context, $blocks);
        // line 89
        echo "    </section>
    ";
    }

    // line 65
    public function block_topbar($context, array $blocks = [])
    {
        if (((($context["github_link_position"] ?? null) == "top") || $this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "breadcrumbs", []), "enabled", []))) {
            // line 66
            echo "            <div id=\"top-bar\">
                ";
            // line 67
            if ((($context["github_link_position"] ?? null) == "top")) {
                // line 68
                echo "                <div id=\"top-github-link\">
                ";
                // line 69
                $this->loadTemplate("partials/github_link.html.twig", "partials/base.html.twig", 69)->display($context);
                // line 70
                echo "                </div>
                ";
            }
            // line 72
            echo "
                ";
            // line 73
            if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "breadcrumbs", []), "enabled", [])) {
                // line 74
                echo "                ";
                $this->loadTemplate("partials/breadcrumbs.html.twig", "partials/base.html.twig", 74)->display($context);
                // line 75
                echo "                ";
            }
            // line 76
            echo "            </div>
            ";
        }
    }

    // line 79
    public function block_content($context, array $blocks = [])
    {
    }

    // line 81
    public function block_footer($context, array $blocks = [])
    {
        // line 82
        echo "                ";
        if ((($context["github_link_position"] ?? null) == "bottom")) {
            // line 83
            echo "                ";
            $this->loadTemplate("partials/github_note.html.twig", "partials/base.html.twig", 83)->display($context);
            // line 84
            echo "                ";
        }
        // line 85
        echo "            ";
    }

    // line 88
    public function block_navigation($context, array $blocks = [])
    {
    }

    // line 92
    public function block_analytics($context, array $blocks = [])
    {
        // line 93
        echo "        ";
        if ($this->getAttribute(($context["theme_config"] ?? null), "google_analytics_code", [])) {
            // line 94
            echo "        ";
            $this->loadTemplate("partials/analytics.html.twig", "partials/base.html.twig", 94)->display($context);
            // line 95
            echo "        ";
        }
        // line 96
        echo "    ";
    }

    // line 98
    public function block_bottom($context, array $blocks = [])
    {
        // line 99
        echo "        ";
        echo $this->getAttribute(($context["assets"] ?? null), "js", [0 => "bottom"], "method");
        echo "
    ";
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
        return array (  363 => 99,  360 => 98,  356 => 96,  353 => 95,  350 => 94,  347 => 93,  344 => 92,  339 => 88,  335 => 85,  332 => 84,  329 => 83,  326 => 82,  323 => 81,  318 => 79,  312 => 76,  309 => 75,  306 => 74,  304 => 73,  301 => 72,  297 => 70,  295 => 69,  292 => 68,  290 => 67,  287 => 66,  283 => 65,  278 => 89,  276 => 88,  272 => 86,  270 => 81,  267 => 80,  265 => 79,  262 => 78,  260 => 65,  252 => 59,  249 => 58,  244 => 55,  242 => 54,  238 => 52,  236 => 51,  230 => 50,  225 => 47,  222 => 46,  215 => 40,  210 => 39,  207 => 38,  198 => 36,  195 => 35,  192 => 34,  189 => 33,  186 => 32,  183 => 31,  180 => 30,  177 => 29,  173 => 27,  170 => 26,  167 => 25,  164 => 24,  161 => 23,  159 => 22,  156 => 21,  153 => 20,  150 => 19,  147 => 18,  144 => 17,  141 => 16,  138 => 15,  133 => 42,  131 => 38,  128 => 37,  126 => 29,  123 => 28,  121 => 15,  116 => 13,  112 => 12,  108 => 11,  105 => 10,  103 => 9,  95 => 8,  92 => 7,  89 => 6,  82 => 101,  80 => 98,  77 => 97,  75 => 92,  72 => 91,  70 => 58,  67 => 57,  65 => 46,  59 => 45,  56 => 44,  54 => 6,  49 => 4,  46 => 3,  44 => 2,  42 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/base.html.twig", "/var/www/www.courseassembler.com/public/docs/user/themes/learn2/templates/partials/base.html.twig");
    }
}
