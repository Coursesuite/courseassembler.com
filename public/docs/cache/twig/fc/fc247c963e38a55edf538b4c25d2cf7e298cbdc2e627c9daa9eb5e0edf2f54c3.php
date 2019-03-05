<?php

/* partials/base.html.twig */
class __TwigTemplate_016619e531708671deec6c6b6a1a4dc6c448ab22dff375910e65cbbbf238db76 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
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
        return array (  318 => 93,  315 => 92,  312 => 91,  309 => 90,  306 => 89,  301 => 86,  297 => 83,  294 => 82,  291 => 81,  288 => 80,  285 => 79,  280 => 77,  274 => 74,  271 => 73,  268 => 72,  266 => 71,  263 => 70,  259 => 68,  257 => 67,  254 => 66,  252 => 65,  249 => 64,  245 => 63,  240 => 87,  238 => 86,  234 => 84,  232 => 79,  229 => 78,  227 => 77,  224 => 76,  222 => 63,  214 => 57,  211 => 56,  206 => 53,  204 => 52,  200 => 50,  198 => 49,  192 => 48,  187 => 45,  184 => 44,  177 => 38,  174 => 37,  171 => 36,  168 => 35,  165 => 34,  162 => 33,  159 => 32,  156 => 31,  150 => 28,  147 => 27,  144 => 26,  141 => 25,  138 => 24,  135 => 23,  133 => 22,  130 => 21,  127 => 20,  124 => 19,  121 => 18,  118 => 17,  115 => 16,  112 => 15,  107 => 40,  105 => 31,  102 => 30,  100 => 15,  95 => 13,  91 => 12,  87 => 11,  84 => 10,  82 => 9,  74 => 8,  71 => 7,  68 => 6,  62 => 94,  59 => 89,  57 => 56,  54 => 55,  52 => 44,  46 => 43,  43 => 42,  41 => 6,  36 => 4,  33 => 3,  31 => 2,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "partials/base.html.twig", "/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/themes/learn2/templates/partials/base.html.twig");
    }
}
