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

/* partials/base-root.html.twig */
class __TwigTemplate_10c739f29562c4d5c7bd03394aa0ba7e819fdb8cce374babc688ce5e2d0b5783 extends \Twig\Template
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
            'body' => [$this, 'block_body'],
            'page' => [$this, 'block_page'],
            'navigation' => [$this, 'block_navigation'],
            'titlebar' => [$this, 'block_titlebar'],
            'content_wrapper' => [$this, 'block_content_wrapper'],
            'messages' => [$this, 'block_messages'],
            'widgets' => [$this, 'block_widgets'],
            'content_top' => [$this, 'block_content_top'],
            'content' => [$this, 'block_content'],
            'content_bottom' => [$this, 'block_content_bottom'],
            'footer' => [$this, 'block_footer'],
            'modals' => [$this, 'block_modals'],
            'bottom' => [$this, 'block_bottom'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        if (($this->getAttribute(($context["uri"] ?? null), "extension", [], "method") == "json")) {
            $this->loadTemplate("default.json.twig", "partials/base-root.html.twig", 1)->display($context);
        } else {
            // line 2
            echo "    <!DOCTYPE html>
    <html lang=\"en\">
    <head>
    ";
            // line 5
            $this->displayBlock('head', $context, $blocks);
            // line 30
            echo "
    ";
            // line 31
            $this->displayBlock('assets', $context, $blocks);
            // line 35
            echo "    </head>
    ";
            // line 36
            $this->displayBlock('body', $context, $blocks);
            // line 132
            echo "    </html>
";
        }
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->resolve($this, $context, $blocks);
    }

    // line 5
    public function block_head($context, array $blocks = [])
    {
        // line 6
        echo "        <meta charset=\"utf-8\" />
        <title>";
        // line 7
        if (($context["title"] ?? null)) {
            echo twig_escape_filter($this->env, ($context["title"] ?? null), "html", null, true);
            echo " | ";
        } else {
            if ($this->getAttribute(($context["header"] ?? null), "title", [])) {
                echo twig_escape_filter($this->env, $this->getAttribute(($context["header"] ?? null), "title", []), "html", null, true);
                echo " | ";
            }
        }
        echo twig_escape_filter($this->env, $this->getAttribute(($context["site"] ?? null), "title", []), "html", null, true);
        echo "</title>
        ";
        // line 8
        if ($this->getAttribute(($context["header"] ?? null), "description", [])) {
            // line 9
            echo "            <meta name=\"description\" content=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["header"] ?? null), "description", []), "html", null, true);
            echo "\">
        ";
        } else {
            // line 11
            echo "            <meta name=\"description\" content=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["site"] ?? null), "description", []), "html", null, true);
            echo "\">
        ";
        }
        // line 13
        echo "        ";
        if ($this->getAttribute(($context["header"] ?? null), "robots", [])) {
            // line 14
            echo "            <meta name=\"robots\" content=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["header"] ?? null), "robots", []), "html", null, true);
            echo "\">
        ";
        } else {
            // line 16
            echo "            <meta name=\"robots\" content=\"noindex, nofollow\">
        ";
        }
        // line 18
        echo "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <link rel=\"icon\" type=\"image/png\" href=\"";
        // line 19
        echo twig_escape_filter($this->env, ($context["base_url_simple"] ?? null), "html", null, true);
        echo twig_escape_filter($this->env, ($context["theme_url"] ?? null), "html", null, true);
        echo "/images/favicon.png\">

        ";
        // line 21
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 24
        echo "
        ";
        // line 25
        $this->loadTemplate("partials/javascript-config.html.twig", "partials/base-root.html.twig", 25)->display($context);
        // line 26
        echo "        ";
        $this->displayBlock('javascripts', $context, $blocks);
        // line 29
        echo "    ";
    }

    // line 21
    public function block_stylesheets($context, array $blocks = [])
    {
        // line 22
        echo "            ";
        $this->loadTemplate("partials/stylesheets.html.twig", "partials/base-root.html.twig", 22)->display($context);
        // line 23
        echo "        ";
    }

    // line 26
    public function block_javascripts($context, array $blocks = [])
    {
        // line 27
        echo "            ";
        $this->loadTemplate("partials/javascripts.html.twig", "partials/base-root.html.twig", 27)->display($context);
        // line 28
        echo "        ";
    }

    public function block_assets($context, array $blocks = array())
    {
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->defer($this, 'assets');
    }

    // line 31
    public function block_assets_deferred($context, array $blocks = array())
    {
        // line 32
        echo "        ";
        echo $this->getAttribute(($context["assets"] ?? null), "css", [], "method");
        echo "
        ";
        // line 33
        echo $this->getAttribute(($context["assets"] ?? null), "js", [], "method");
        echo "
    ";
        $this->env->getExtension('Phive\Twig\Extensions\Deferred\DeferredExtension')->resolve($this, $context, $blocks);
    }

    // line 36
    public function block_body($context, array $blocks = [])
    {
        // line 37
        echo "    <body class=\"ga-theme-17x ";
        echo ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "sidebar", []), "size", []) == "small")) ? ("sidebar-closed") : (""));
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "body_classes", []), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, ($context["body_classes"] ?? null), "html", null, true);
        echo "\">

    ";
        // line 39
        if ( !$this->env->getExtension('Grav\Common\Twig\TwigExtension')->authorize([0 => "admin.login"])) {
            // line 40
            echo "        ";
            $this->loadTemplate("partials/messages.html.twig", "partials/base-root.html.twig", 40)->display($context);
            // line 41
            echo "    ";
        } else {
            // line 42
            echo "
        ";
            // line 43
            $this->displayBlock('page', $context, $blocks);
            // line 124
            echo "
    ";
        }
        // line 126
        echo "
    ";
        // line 127
        $this->displayBlock('bottom', $context, $blocks);
        // line 130
        echo "    </body>
    ";
    }

    // line 43
    public function block_page($context, array $blocks = [])
    {
        // line 44
        echo "        <div class=\"remodal-bg\">

            ";
        // line 46
        $this->displayBlock('navigation', $context, $blocks);
        // line 49
        echo "
            <main id=\"admin-main\" >
                ";
        // line 51
        $this->loadTemplate("partials/nav-toggle.html.twig", "partials/base-root.html.twig", 51)->display($context);
        // line 52
        echo "                <div id=\"titlebar\" class=\"titlebar\">
                    ";
        // line 53
        $this->displayBlock('titlebar', $context, $blocks);
        // line 54
        echo "                </div>

                ";
        // line 56
        $this->displayBlock('content_wrapper', $context, $blocks);
        // line 82
        echo "
                ";
        // line 83
        $this->displayBlock('modals', $context, $blocks);
        // line 119
        echo "
            </main>
            <div id='overlay'></div>
        </div>
        ";
    }

    // line 46
    public function block_navigation($context, array $blocks = [])
    {
        // line 47
        echo "                ";
        $this->loadTemplate("partials/nav.html.twig", "partials/base-root.html.twig", 47)->display($context);
        // line 48
        echo "            ";
    }

    // line 53
    public function block_titlebar($context, array $blocks = [])
    {
    }

    // line 56
    public function block_content_wrapper($context, array $blocks = [])
    {
        // line 57
        echo "                <div class=\"content-wrapper\">
                    <div class=\"";
        // line 58
        if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "content_padding", [])) {
            echo "content-padding";
        }
        echo "\">
                        ";
        // line 59
        $this->displayBlock('messages', $context, $blocks);
        // line 62
        echo "
                        ";
        // line 63
        $this->displayBlock('widgets', $context, $blocks);
        // line 64
        echo "                        <div class=\"default-box-shadow\">
                            ";
        // line 65
        $this->displayBlock('content_top', $context, $blocks);
        // line 66
        echo "                            <div class=\"admin-block\">";
        // line 67
        $this->displayBlock('content', $context, $blocks);
        // line 68
        echo "</div>
                            ";
        // line 69
        if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "show_github_msg", [])) {
            // line 70
            echo "                            <div class=\"notice alert\"><i class=\"fa fa-github\"></i> <a href=\"https://github.com/getgrav/grav-plugin-admin/issues\" target=\"_blank\" rel=\"noopener noreferrer\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ADMIN_REPORT_ISSUE"), "html", null, true);
            echo "</a></div>
                            ";
        }
        // line 72
        echo "                            ";
        $this->displayBlock('content_bottom', $context, $blocks);
        // line 73
        echo "                        </div>
                        ";
        // line 74
        $this->displayBlock('footer', $context, $blocks);
        // line 79
        echo "                    </div>
                </div>
                ";
    }

    // line 59
    public function block_messages($context, array $blocks = [])
    {
        // line 60
        echo "                            ";
        $this->loadTemplate("partials/messages.html.twig", "partials/base-root.html.twig", 60)->display($context);
        // line 61
        echo "                        ";
    }

    // line 63
    public function block_widgets($context, array $blocks = [])
    {
    }

    // line 65
    public function block_content_top($context, array $blocks = [])
    {
    }

    // line 67
    public function block_content($context, array $blocks = [])
    {
    }

    // line 72
    public function block_content_bottom($context, array $blocks = [])
    {
    }

    // line 74
    public function block_footer($context, array $blocks = [])
    {
        // line 75
        echo "                        <footer id=\"footer\">
                             ";
        // line 76
        $this->loadTemplate("partials/footer.html.twig", "partials/base-root.html.twig", 76)->display($context);
        // line 77
        echo "                        </footer>
                        ";
    }

    // line 83
    public function block_modals($context, array $blocks = [])
    {
        // line 84
        echo "                <div class=\"remodal\" data-remodal-id=\"generic\" data-remodal-options=\"hashTracking: false\">
                    <form>
                        <h1>";
        // line 86
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ERROR"), "html", null, true);
        echo "</h1>
                        <div class=\"error-content\"></div>
                        <div class=\"button-bar\">
                            <a class=\"button remodal-cancel\" data-remodal-action=\"cancel\" href=\"#\">";
        // line 89
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLOSE"), "html", null, true);
        echo "</a>
                        </div>
                    </form>
                </div>
                <div class=\"remodal\" data-remodal-id=\"metadata\" data-remodal-options=\"hashTracking: false\">
                    <form>
                        <h1><span>";
        // line 95
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.METADATA"), "html", null, true);
        echo " for</span> <strong></strong></h1>
                        <div class=\"metadata-preview\">
                            <div class=\"meta-preview\"></div>
                            <div class=\"meta-content\"></div>
                        </div>
                        <div class=\"button-bar\">
                            <a class=\"button remodal-cancel\" data-remodal-action=\"cancel\" href=\"#\">";
        // line 101
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CLOSE"), "html", null, true);
        echo "</a>
                        </div>
                    </form>
                </div>
                <div class=\"remodal\" data-remodal-id=\"delete-media\" data-remodal-options=\"hashTracking: false\">
                    <form>
                        <h1>";
        // line 107
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.MODAL_DELETE_FILE_CONFIRMATION_REQUIRED_TITLE"), "html", null, true);
        echo "</h1>
                        <p class=\"bigger\">
                            ";
        // line 109
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.MODAL_DELETE_FILE_CONFIRMATION_REQUIRED_DESC"), "html", null, true);
        echo "
                        </p>
                        <br>
                        <div class=\"button-bar\">
                            <button data-remodal-action=\"cancel\" class=\"button secondary remodal-cancel\"><i class=\"fa fa-fw fa-close\"></i> ";
        // line 113
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANCEL"), "html", null, true);
        echo "</button>
                            <button data-remodal-action=\"confirm\" class=\"button remodal-confirm disable-after-click\"><i class=\"fa fa-fw fa-check\"></i> ";
        // line 114
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CONTINUE"), "html", null, true);
        echo "</button>
                        </div>
                    </form>
                </div>
                ";
    }

    // line 127
    public function block_bottom($context, array $blocks = [])
    {
        // line 128
        echo "        ";
        echo $this->getAttribute(($context["assets"] ?? null), "js", [0 => "bottom"], "method");
        echo "
    ";
    }

    public function getTemplateName()
    {
        return "partials/base-root.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  442 => 128,  439 => 127,  430 => 114,  426 => 113,  419 => 109,  414 => 107,  405 => 101,  396 => 95,  387 => 89,  381 => 86,  377 => 84,  374 => 83,  369 => 77,  367 => 76,  364 => 75,  361 => 74,  356 => 72,  351 => 67,  346 => 65,  341 => 63,  337 => 61,  334 => 60,  331 => 59,  325 => 79,  323 => 74,  320 => 73,  317 => 72,  311 => 70,  309 => 69,  306 => 68,  304 => 67,  302 => 66,  300 => 65,  297 => 64,  295 => 63,  292 => 62,  290 => 59,  284 => 58,  281 => 57,  278 => 56,  273 => 53,  269 => 48,  266 => 47,  263 => 46,  255 => 119,  253 => 83,  250 => 82,  248 => 56,  244 => 54,  242 => 53,  239 => 52,  237 => 51,  233 => 49,  231 => 46,  227 => 44,  224 => 43,  219 => 130,  217 => 127,  214 => 126,  210 => 124,  208 => 43,  205 => 42,  202 => 41,  199 => 40,  197 => 39,  187 => 37,  184 => 36,  177 => 33,  172 => 32,  169 => 31,  160 => 28,  157 => 27,  154 => 26,  150 => 23,  147 => 22,  144 => 21,  140 => 29,  137 => 26,  135 => 25,  132 => 24,  130 => 21,  124 => 19,  121 => 18,  117 => 16,  111 => 14,  108 => 13,  102 => 11,  96 => 9,  94 => 8,  81 => 7,  78 => 6,  75 => 5,  68 => 132,  66 => 36,  63 => 35,  61 => 31,  58 => 30,  56 => 5,  51 => 2,  47 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/base-root.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/base-root.html.twig");
    }
}
