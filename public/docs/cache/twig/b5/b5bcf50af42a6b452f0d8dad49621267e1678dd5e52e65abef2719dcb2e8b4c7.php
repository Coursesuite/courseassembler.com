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

/* forms/fields/text/text.html.twig */
class __TwigTemplate_3a419fdd666534e79cafdcd3d6e5c3dc607a82469c51b3592e19afbd7cbe8fe1 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'prepend' => [$this, 'block_prepend'],
            'input_attributes' => [$this, 'block_input_attributes'],
            'append' => [$this, 'block_append'],
            'input' => [$this, 'block_input'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "forms/field.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/text/text.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_prepend($context, array $blocks = [])
    {
        // line 4
        if ($this->getAttribute(($context["field"] ?? null), "prepend", [])) {
            // line 5
            echo "    <div class=\"form-input-addon form-input-prepend\">";
            // line 6
            echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute(($context["field"] ?? null), "prepend", []));
            // line 7
            echo "</div>
";
        }
    }

    // line 11
    public function block_input_attributes($context, array $blocks = [])
    {
        // line 12
        echo "    type=\"text\"
    ";
        // line 13
        if ($this->getAttribute(($context["field"] ?? null), "size", [])) {
            echo "size=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
            echo "\"";
        }
        // line 14
        echo "    ";
        if (($this->getAttribute(($context["field"] ?? null), "minlength", [], "any", true, true) || $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", [], "any", false, true), "min", [], "any", true, true))) {
            echo "minlength=\"";
            echo twig_escape_filter($this->env, (($this->getAttribute(($context["field"] ?? null), "minlength", [], "any", true, true)) ? (_twig_default_filter($this->getAttribute(($context["field"] ?? null), "minlength", []), $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", []))) : ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "min", []))), "html", null, true);
            echo "\"";
        }
        // line 15
        echo "    ";
        if (($this->getAttribute(($context["field"] ?? null), "maxlength", [], "any", true, true) || $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", [], "any", false, true), "max", [], "any", true, true))) {
            echo "maxlength=\"";
            echo twig_escape_filter($this->env, (($this->getAttribute(($context["field"] ?? null), "maxlength", [], "any", true, true)) ? (_twig_default_filter($this->getAttribute(($context["field"] ?? null), "maxlength", []), $this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", []))) : ($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "max", []))), "html", null, true);
            echo "\"";
        }
        // line 16
        echo "    ";
        $this->displayParentBlock("input_attributes", $context, $blocks);
        echo "
";
    }

    // line 19
    public function block_append($context, array $blocks = [])
    {
        // line 20
        echo "    ";
        if ($this->getAttribute(($context["field"] ?? null), "copy_to_clipboard", [])) {
            // line 21
            echo "        <div class=\"form-input-addon form-input-append copy-to-clipboard\">
            ";
            // line 22
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->dump($this->env, $context, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute(($context["field"] ?? null), "copy_to_clipboard", []))), "html", null, true);
            echo "
            ";
            // line 23
            if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "copy_to_clipboard", []), [0 => "0", 1 => "1"])) {
                // line 24
                echo "                <i class=\"fa fa-clipboard\"></i>
            ";
            } else {
                // line 26
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute(($context["field"] ?? null), "copy_to_clipboard", []));
            }
            // line 28
            echo "        </div>
    ";
        } elseif ($this->getAttribute(        // line 29
($context["field"] ?? null), "append", [])) {
            // line 30
            echo "        <div class=\"form-input-addon form-input-append\">";
            // line 31
            echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute(($context["field"] ?? null), "append", []));
            // line 32
            echo "</div>
    ";
        }
    }

    // line 36
    public function block_input($context, array $blocks = [])
    {
        // line 37
        if ((($this->getAttribute(($context["field"] ?? null), "prepend", []) || $this->getAttribute(($context["field"] ?? null), "append", [])) || $this->getAttribute(($context["field"] ?? null), "copy_to_clipboard", []))) {
            // line 38
            echo "    ";
            $context["field"] = twig_array_merge(($context["field"] ?? null), ["wrapper_classes" => "form-input-addon-wrapper"]);
        }
        // line 40
        $this->displayParentBlock("input", $context, $blocks);
        echo "
";
    }

    public function getTemplateName()
    {
        return "forms/fields/text/text.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  136 => 40,  132 => 38,  130 => 37,  127 => 36,  121 => 32,  119 => 31,  117 => 30,  115 => 29,  112 => 28,  109 => 26,  105 => 24,  103 => 23,  99 => 22,  96 => 21,  93 => 20,  90 => 19,  83 => 16,  76 => 15,  69 => 14,  63 => 13,  60 => 12,  57 => 11,  51 => 7,  49 => 6,  47 => 5,  45 => 4,  42 => 3,  32 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/text/text.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/form/templates/forms/fields/text/text.html.twig");
    }
}
