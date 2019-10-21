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

/* forms/fields/hidden/hidden.html.twig */
class __TwigTemplate_f50e0284fa31e177dd528ab9b434d2a01b483e515be895a05ad6f3217c338394 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'field' => [$this, 'block_field'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "forms/field.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/hidden/hidden.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_field($context, array $blocks = [])
    {
        // line 4
        echo "
";
        // line 5
        $context["value"] = ((($context["value"] ?? null)) ? (($context["value"] ?? null)) : ((($this->getAttribute(($context["field"] ?? null), "value", [], "any", true, true)) ? (_twig_default_filter($this->getAttribute(($context["field"] ?? null), "value", []), $this->getAttribute(($context["field"] ?? null), "default", []))) : ($this->getAttribute(($context["field"] ?? null), "default", [])))));
        // line 6
        $context["value"] = (($this->getAttribute(($context["field"] ?? null), "evaluate", [])) ? ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->evaluateStringFunc($context, ($context["value"] ?? null))) : (($context["value"] ?? null)));
        // line 7
        echo "
<input data-grav-field=\"hidden\" data-grav-disabled=\"false\" type=\"hidden\" class=\"input\" name=\"";
        // line 8
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
        echo "\" value=\"";
        echo twig_escape_filter($this->env, twig_join_filter(($context["value"] ?? null), ", "), "html_attr");
        echo "\" />
";
    }

    public function getTemplateName()
    {
        return "forms/fields/hidden/hidden.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  52 => 8,  49 => 7,  47 => 6,  45 => 5,  42 => 4,  39 => 3,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/hidden/hidden.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/form/templates/forms/fields/hidden/hidden.html.twig");
    }
}
