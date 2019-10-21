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

/* partials/login-logo.html.twig */
class __TwigTemplate_e857c23086ea48aef6a9463c2a6735cdb3e1556f8accd2ca5de3dc6e36b56eed extends \Twig\Template
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
        if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "logo_text", [])) {
            // line 2
            echo "    <h1 class=\"text-logo\">
        ";
            // line 3
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "logo_text", []), "html", null, true);
            echo "
    </h1>
";
        } else {
            // line 6
            echo "    <h1 class=\"";
            echo ((($context["custom_login_logo"] ?? null)) ? ("custom-logo") : ("default-logo"));
            echo "\">
        ";
            // line 7
            echo twig_escape_filter($this->env, ($context["title"] ?? null), "html", null, true);
            echo "
        ";
            // line 8
            if (($context["custom_login_logo"] ?? null)) {
                // line 9
                echo "            <img src=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->urlFunc(($context["custom_login_logo"] ?? null)), "html", null, true);
                echo "\" title=\"Login\" />
        ";
            } else {
                // line 11
                echo "            ";
                $this->loadTemplate("@admin-images/logo.svg", "partials/login-logo.html.twig", 11)->display($context);
                // line 12
                echo "        ";
            }
            // line 13
            echo "    </h1>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/login-logo.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  64 => 13,  61 => 12,  58 => 11,  52 => 9,  50 => 8,  46 => 7,  41 => 6,  35 => 3,  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/login-logo.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/login-logo.html.twig");
    }
}
