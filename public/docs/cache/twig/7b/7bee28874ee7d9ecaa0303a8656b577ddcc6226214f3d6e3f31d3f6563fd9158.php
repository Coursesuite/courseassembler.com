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

/* forms/fields/datetime/datetime.html.twig */
class __TwigTemplate_68a5df413d61c9df9ae3f2eec9f149b8261ff92d978d7018c521aa20b147521a extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'input' => [$this, 'block_input'],
            'input_attributes' => [$this, 'block_input_attributes'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "forms/field.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 3
        $context["value"] = (((null === ($context["value"] ?? null))) ? ($this->getAttribute(($context["field"] ?? null), "default", [])) : (($context["value"] ?? null)));
        // line 4
        $context["default_php_dateformat"] = $this->getAttribute(($context["admin"] ?? null), "guessDateFormat", [0 => ($context["value"] ?? null)], "method");
        // line 5
        $context["php_dateformat"] = (($this->getAttribute(($context["field"] ?? null), "format", [])) ? ($this->getAttribute(($context["field"] ?? null), "format", [])) : ((($this->getAttribute($this->getAttribute(($context["admin"] ?? null), "page", []), "dateformat", [])) ? ($this->getAttribute($this->getAttribute(($context["admin"] ?? null), "page", []), "dateformat", [])) : ((($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "system", []), "pages", []), "dateformat", []), "default", [])) ? ($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["config"] ?? null), "system", []), "pages", []), "dateformat", []), "default", [])) : (($context["default_php_dateformat"] ?? null)))))));
        // line 6
        $context["js_dateformat"] = $this->getAttribute(($context["admin"] ?? null), "dateformatToMomentJS", [0 => ($context["php_dateformat"] ?? null)], "method");
        // line 7
        $context["value"] = (((null === ($context["value"] ?? null))) ? (($context["value"] ?? null)) : (twig_date_format_filter($this->env, ($context["value"] ?? null), ($context["php_dateformat"] ?? null))));
        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/datetime/datetime.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 9
    public function block_input($context, array $blocks = [])
    {
        // line 10
        echo "<div class=\"form-input-wrapper datetime-picker-wrapper ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo "\">
    <input
            name=\"";
        // line 12
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
        echo "\"
            value=\"";
        // line 13
        echo twig_escape_filter($this->env, twig_join_filter(($context["value"] ?? null), ", "), "html", null, true);
        echo "\"
            ";
        // line 14
        $this->displayBlock('input_attributes', $context, $blocks);
        // line 21
        echo "    />
    <span class=\"field-icons\">
        <i class=\"fa fa-fw fa-calendar\"></i>
    </span>
</div>
";
    }

    // line 14
    public function block_input_attributes($context, array $blocks = [])
    {
        // line 15
        echo "                type=\"text\"
                data-grav-datetime=\"";
        // line 16
        echo twig_escape_filter($this->env, twig_jsonencode_filter(["format" => ($context["js_dateformat"] ?? null)]), "html_attr");
        echo "\"
                ";
        // line 17
        if ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", [])) {
            echo "min=\"";
            echo twig_escape_filter($this->env, (((null === $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", []))) ? ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", [])) : (twig_date_format_filter($this->env, $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", []), ($context["php_dateformat"] ?? null)))), "html", null, true);
            echo "\"";
        }
        // line 18
        echo "                ";
        if ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", [])) {
            echo "max=\"";
            echo twig_escape_filter($this->env, (((null === $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", []))) ? ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", [])) : (twig_date_format_filter($this->env, $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", []), ($context["php_dateformat"] ?? null)))), "html", null, true);
            echo "\"";
        }
        // line 19
        echo "                ";
        $this->displayParentBlock("input_attributes", $context, $blocks);
        echo "
            ";
    }

    public function getTemplateName()
    {
        return "forms/fields/datetime/datetime.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  102 => 19,  95 => 18,  89 => 17,  85 => 16,  82 => 15,  79 => 14,  70 => 21,  68 => 14,  64 => 13,  60 => 12,  54 => 10,  51 => 9,  46 => 1,  44 => 7,  42 => 6,  40 => 5,  38 => 4,  36 => 3,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/datetime/datetime.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/forms/fields/datetime/datetime.html.twig");
    }
}
