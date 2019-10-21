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

/* forms/fields/pages/pages.html.twig */
class __TwigTemplate_89f4f0f5b079d087f0b1c17ef084b43b21f0c37821ae8df61f3b82712d0c8ed2 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'global_attributes' => [$this, 'block_global_attributes'],
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
        // line 17
        $context["macro"] = $this;
        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/pages/pages.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 19
    public function block_global_attributes($context, array $blocks = [])
    {
        // line 20
        echo "    data-grav-selectize=\"";
        echo twig_escape_filter($this->env, twig_jsonencode_filter((($this->getAttribute(($context["field"] ?? null), "selectize", [], "any", true, true)) ? ($this->getAttribute(($context["field"] ?? null), "selectize", [])) : ([]))), "html_attr");
        echo "\"
    data-grav-field=\"select\"
    data-grav-disabled=\"";
        // line 22
        echo (((null === ($context["originalValue"] ?? null))) ? ("true") : ("false"));
        echo "\"
    data-grav-default=\"";
        // line 23
        echo twig_escape_filter($this->env, twig_jsonencode_filter($this->getAttribute(($context["field"] ?? null), "default", [])), "html_attr");
        echo "\"
";
    }

    // line 26
    public function block_input($context, array $blocks = [])
    {
        // line 27
        echo "
    ";
        // line 28
        $context["start_page"] = (($this->getAttribute(($context["field"] ?? null), "start_route", [])) ? ($this->getAttribute(($context["pages"] ?? null), "find", [0 => $this->getAttribute(($context["field"] ?? null), "start_route", [])], "method")) : (null));
        // line 29
        echo "    ";
        $context["show_all"] = ((($this->getAttribute(($context["field"] ?? null), "show_all", []) === false)) ? (false) : (true));
        // line 30
        echo "    ";
        $context["show_fullpath"] = ((($this->getAttribute(($context["field"] ?? null), "show_fullpath", []) === true)) ? (true) : (false));
        // line 31
        echo "    ";
        $context["show_slug"] = ((($this->getAttribute(($context["field"] ?? null), "show_slug", []) === true)) ? (true) : (false));
        // line 32
        echo "    ";
        $context["show_modular"] = ((($this->getAttribute(($context["field"] ?? null), "show_modular", []) === true)) ? (true) : (false));
        // line 33
        echo "    ";
        $context["limit_levels"] = (($this->getAttribute(($context["field"] ?? null), "limit_levels", [])) ? ($this->getAttribute(($context["field"] ?? null), "limit_levels", [])) : (false));
        // line 34
        echo "
    ";
        // line 35
        $context["page_list"] = $this->getAttribute($this->getAttribute(($context["grav"] ?? null), "pages", []), "getList", [0 => ($context["start_page"] ?? null), 1 => 0, 2 => true, 3 => ($context["show_all"] ?? null), 4 => ($context["show_fullpath"] ?? null), 5 => ($context["show_slug"] ?? null), 6 => ($context["show_modular"] ?? null), 7 => ($context["limit_levels"] ?? null)], "method");
        // line 36
        echo "
    <div class=\"form-select-wrapper ";
        // line 37
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo "\">
        <select class=\"";
        // line 38
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "classes", []), "html", null, true);
        echo "\" name=\"";
        echo twig_escape_filter($this->env, ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))) . (($this->getAttribute(($context["field"] ?? null), "multiple", [])) ? ("[]") : (""))), "html", null, true);
        echo "\"
                ";
        // line 39
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "autofocus", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "autofocus=\"autofocus\"";
        }
        // line 40
        echo "                ";
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "novalidate", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "novalidate=\"novalidate\"";
        }
        // line 41
        echo "                ";
        if (twig_in_filter($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "required", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "required=\"required\"";
        }
        // line 42
        echo "                ";
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "multiple", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "multiple=\"multiple\"";
        }
        // line 43
        echo "                ";
        if (($this->getAttribute(($context["field"] ?? null), "disabled", []) || ($context["isDisabledToggleable"] ?? null))) {
            echo "disabled=\"disabled\"";
        }
        // line 44
        echo "                >
        ";
        // line 45
        if ($this->getAttribute(($context["field"] ?? null), "show_root", [])) {
            // line 46
            echo "            <option value=\"/\">/ (root)</option>
        ";
        }
        // line 48
        echo "        ";
        echo $context["macro"]->getpage_options($context, ($context["page_list"] ?? null));
        echo "
        </select>
    </div>
";
    }

    // line 3
    public function getpage_options($__globals__ = null, $__pages_list__ = null, ...$__varargs__)
    {
        $context = $this->env->mergeGlobals([
            "globals" => $__globals__,
            "pages_list" => $__pages_list__,
            "varargs" => $__varargs__,
        ]);

        $blocks = [];

        ob_start(function () { return ''; });
        try {
            // line 4
            echo "    ";
            $context["field"] = $this->getAttribute(($context["globals"] ?? null), "field", []);
            // line 5
            echo "    ";
            $context["value"] = $this->getAttribute(($context["globals"] ?? null), "value", []);
            // line 6
            echo "    ";
            if (($this->getAttribute(($context["field"] ?? null), "options", []) && (($context["depth"] ?? null) == 0))) {
                // line 7
                echo "        ";
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["field"] ?? null), "options", []));
                foreach ($context['_seq'] as $context["key"] => $context["value"]) {
                    // line 8
                    echo "            <option value=\"";
                    echo twig_escape_filter($this->env, $context["key"], "html_attr");
                    echo "\">";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $context["value"]), "html", null, true);
                    echo "</option>
        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['key'], $context['value'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 10
                echo "    ";
            }
            // line 11
            echo "
    ";
            // line 12
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["pages_list"] ?? null));
            foreach ($context['_seq'] as $context["page_route"] => $context["option"]) {
                // line 13
                echo "        <option ";
                if ((($context["page_route"] == ($context["value"] ?? null)) || ($this->getAttribute(($context["field"] ?? null), "multiple", []) && twig_in_filter($context["page_route"], ($context["value"] ?? null))))) {
                    echo "selected=\"selected\"";
                }
                echo " value=\"";
                echo twig_escape_filter($this->env, $context["page_route"], "html", null, true);
                echo "\">";
                echo $context["option"];
                echo "</option>
    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['page_route'], $context['option'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        } catch (\Exception $e) {
            ob_end_clean();

            throw $e;
        } catch (\Throwable $e) {
            ob_end_clean();

            throw $e;
        }

        return ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
    }

    public function getTemplateName()
    {
        return "forms/fields/pages/pages.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  193 => 13,  189 => 12,  186 => 11,  183 => 10,  172 => 8,  167 => 7,  164 => 6,  161 => 5,  158 => 4,  145 => 3,  136 => 48,  132 => 46,  130 => 45,  127 => 44,  122 => 43,  117 => 42,  112 => 41,  107 => 40,  103 => 39,  97 => 38,  93 => 37,  90 => 36,  88 => 35,  85 => 34,  82 => 33,  79 => 32,  76 => 31,  73 => 30,  70 => 29,  68 => 28,  65 => 27,  62 => 26,  56 => 23,  52 => 22,  46 => 20,  43 => 19,  38 => 1,  36 => 17,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/pages/pages.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/forms/fields/pages/pages.html.twig");
    }
}
