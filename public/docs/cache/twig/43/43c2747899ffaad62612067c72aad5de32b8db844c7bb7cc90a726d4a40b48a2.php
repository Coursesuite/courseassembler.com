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

/* preview.html.twig */
class __TwigTemplate_144d8aba0c9f007086becea9fccf23a04d9948e1d4319b7e801ebb3b68c0cc2c extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'titlebar' => [$this, 'block_titlebar'],
            'content_wrapper' => [$this, 'block_content_wrapper'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "partials/base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 3
        $context["route"] = ((($this->getAttribute(($context["admin"] ?? null), "route", []) == "")) ? ("/") : (("/" . $this->getAttribute(($context["admin"] ?? null), "route", []))));
        // line 4
        $context["preview_link"] = ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter(($context["base_url_relative_frontend"] ?? null), "/") . ($context["route"] ?? null));
        // line 5
        $context["preview_html"] = (((($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter(($context["base_url"] ?? null), "/") . "/preview") . (($this->getAttribute(($context["context"] ?? null), "home", [])) ? ("") : ($this->getAttribute(($context["context"] ?? null), "route", []))))) ? ((($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter(($context["base_url"] ?? null), "/") . "/preview") . (($this->getAttribute(($context["context"] ?? null), "home", [])) ? ("") : ($this->getAttribute(($context["context"] ?? null), "route", []))))) : ("/"));
        // line 6
        $context["admin_route"] = ("/" . $this->getAttribute(($context["admin"] ?? null), "route", []));
        // line 7
        $context["back_link"] = (($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter(($context["base_url"] ?? null), "/") . "/pages") . $this->getAttribute($this->getAttribute(($context["page"] ?? null), "find", [0 => ($context["admin_route"] ?? null)], "method"), "rawRoute", [], "method"));
        // line 1
        $this->parent = $this->loadTemplate("partials/base.html.twig", "preview.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 9
    public function block_titlebar($context, array $blocks = [])
    {
        // line 10
        echo "    <div class=\"button-bar\">
        <a class=\"button\" href=\"";
        // line 11
        echo twig_escape_filter($this->env, ($context["back_link"] ?? null), "html", null, true);
        echo "\"><i class=\"fa fa-reply\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.BACK"), "html", null, true);
        echo "</a>
        <a class=\"button\" href=\"";
        // line 12
        echo twig_escape_filter($this->env, ($context["preview_link"] ?? null), "html", null, true);
        echo "\" target=\"_blank\"><i class=\"fa fa-external-link\"></i> ";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.OPEN_NEW_TAB"), "html", null, true);
        echo "</a>
    </div>
    <h1><i class=\"fa fa-fw fa-eye\"></i> ";
        // line 14
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.PREVIEW"), "html", null, true);
        echo ": <strong>/";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["admin"] ?? null), "route", []), "html", null, true);
        echo "</strong></h1>
";
    }

    // line 17
    public function block_content_wrapper($context, array $blocks = [])
    {
        // line 18
        echo "
    <div class=\"content-wrapper preview-wrapper\">
        <div class=\"content-padding\" width=\"100%\" height=\"100%\">
            <iframe width=\"100%\" height=\"100%\" frameborder=\"0\" src=\"";
        // line 21
        echo twig_escape_filter($this->env, ($context["preview_link"] ?? null), "html", null, true);
        echo "\" />
        </div>
    </div>
";
    }

    public function getTemplateName()
    {
        return "preview.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  86 => 21,  81 => 18,  78 => 17,  70 => 14,  63 => 12,  57 => 11,  54 => 10,  51 => 9,  46 => 1,  44 => 7,  42 => 6,  40 => 5,  38 => 4,  36 => 3,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "preview.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/preview.html.twig");
    }
}
