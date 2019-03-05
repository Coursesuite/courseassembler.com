<?php

/* partials/stylesheets.html.twig */
class __TwigTemplate_3d5d94c6ac5a8c2ac0625e6e4da2f273593f8045e915bdd3228297eab74360ff extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css-compiled/nucleus.css")], "method");
        // line 2
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css-compiled/template.css")], "method");
        // line 3
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css-compiled/preset.css")], "method");
        // line 4
        if ($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "admin", []), "google_fonts", [])) {
            // line 5
            echo "    ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css-compiled/fonts.css")], "method");
        } else {
            // line 7
            echo "    ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css-compiled/simple-fonts.css")], "method");
        }
        // line 9
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (((($context["theme_url"] ?? null) . "/css/") . ($context["icon_style"] ?? null)) . ".min.css")], "method");
        // line 10
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/chartist.min.css")], "method");
        // line 11
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/selectize.min.css")], "method");
        // line 12
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/hint.base.min.css")], "method");
        // line 13
        $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/iconpicker.css")], "method");
        // line 14
        if (((($this->getAttribute(($context["browser"] ?? null), "getBrowser", []) == "msie") && ($this->getAttribute(($context["browser"] ?? null), "getVersion", []) >= 8)) && ($this->getAttribute(($context["browser"] ?? null), "getVersion", []) <= 9))) {
            // line 15
            echo "    ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/nucleus-ie9.css")], "method");
            // line 16
            echo "    ";
            $this->getAttribute(($context["assets"] ?? null), "addCss", [0 => (($context["theme_url"] ?? null) . "/css/pure-0.5.0/grids-min.css")], "method");
        }
    }

    public function getTemplateName()
    {
        return "partials/stylesheets.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  50 => 16,  47 => 15,  45 => 14,  43 => 13,  41 => 12,  39 => 11,  37 => 10,  35 => 9,  31 => 7,  27 => 5,  25 => 4,  23 => 3,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "partials/stylesheets.html.twig", "/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/stylesheets.html.twig");
    }
}
