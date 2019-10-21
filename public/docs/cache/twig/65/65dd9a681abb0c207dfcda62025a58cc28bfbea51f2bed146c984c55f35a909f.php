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

/* forms/fields/select/select.html.twig */
class __TwigTemplate_e407f704d1d603115109f20b40b326f070896567a86b4c80ab0f9f5ea965fa33 extends \Twig\Template
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
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/select/select.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_global_attributes($context, array $blocks = [])
    {
        // line 4
        echo "    data-grav-selectize=\"";
        echo twig_escape_filter($this->env, twig_jsonencode_filter((($this->getAttribute(($context["field"] ?? null), "selectize", [], "any", true, true)) ? ($this->getAttribute(($context["field"] ?? null), "selectize", [])) : ([]))), "html_attr");
        echo "\"
    ";
        // line 5
        $this->displayParentBlock("global_attributes", $context, $blocks);
        echo "
";
    }

    // line 8
    public function block_input($context, array $blocks = [])
    {
        // line 9
        echo "    <div class=\"";
        ((($context["form_field_wrapper_classes"] ?? null)) ? (print (twig_escape_filter($this->env, ($context["form_field_wrapper_classes"] ?? null), "html", null, true))) : (print ("form-select-wrapper")));
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "wrapper_classes", []), "html", null, true);
        echo "\">
        <select name=\"";
        // line 10
        echo twig_escape_filter($this->env, ($this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))) . (($this->getAttribute(($context["field"] ?? null), "multiple", [])) ? ("[]") : (""))), "html", null, true);
        echo "\"
                class=\"";
        // line 11
        echo twig_escape_filter($this->env, ($context["form_field_select_classes"] ?? null), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "classes", []), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo "\"
                ";
        // line 12
        if ($this->getAttribute(($context["field"] ?? null), "id", [], "any", true, true)) {
            echo "id=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "id", []));
            echo "\" ";
        }
        // line 13
        echo "                ";
        if ($this->getAttribute(($context["field"] ?? null), "style", [], "any", true, true)) {
            echo "style=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "style", []));
            echo "\" ";
        }
        // line 14
        echo "                ";
        if ($this->getAttribute(($context["field"] ?? null), "disabled", [])) {
            echo "disabled=\"disabled\"";
        }
        // line 15
        echo "                ";
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "autofocus", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "autofocus=\"autofocus\"";
        }
        // line 16
        echo "                ";
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "novalidate", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "novalidate=\"novalidate\"";
        }
        // line 17
        echo "                ";
        if (($context["required"] ?? null)) {
            echo "required=\"required\"";
        }
        // line 18
        echo "                ";
        if (twig_in_filter($this->getAttribute(($context["field"] ?? null), "multiple", []), [0 => "on", 1 => "true", 2 => 1])) {
            echo "multiple=\"multiple\"";
        }
        // line 19
        echo "                ";
        if (($this->getAttribute(($context["field"] ?? null), "disabled", []) || ($context["isDisabledToggleable"] ?? null))) {
            echo "disabled=\"disabled\"";
        }
        // line 20
        echo "                ";
        if ($this->getAttribute(($context["field"] ?? null), "form", [])) {
            echo "form=\"";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "form", []), "html", null, true);
            echo "\"";
        }
        // line 21
        echo "                ";
        if ($this->getAttribute(($context["field"] ?? null), "key", [])) {
            // line 22
            echo "                    data-key-observe=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
            echo "\"
                ";
        }
        // line 24
        echo "                ";
        if ($this->getAttribute(($context["field"] ?? null), "datasets", [])) {
            // line 25
            echo "                    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["field"] ?? null), "datasets", []));
            foreach ($context['_seq'] as $context["datakey"] => $context["datavalue"]) {
                // line 26
                echo "                        data-";
                echo twig_escape_filter($this->env, $context["datakey"], "html", null, true);
                echo "=\"";
                echo twig_escape_filter($this->env, $context["datavalue"], "html_attr");
                echo "\"
                    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['datakey'], $context['datavalue'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 28
            echo "                ";
        }
        // line 29
        echo "                >
            ";
        // line 30
        if ($this->getAttribute(($context["field"] ?? null), "placeholder", [])) {
            echo "<option value=\"\" disabled selected>";
            echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute(($context["field"] ?? null), "placeholder", []));
            echo "</option>";
        }
        // line 31
        echo "
            ";
        // line 32
        $context["options"] = $this->getAttribute(($context["field"] ?? null), "options", []);
        // line 33
        echo "            ";
        if (($this->getAttribute($this->getAttribute(($context["field"] ?? null), "selectize", []), "create", []) && $this->getAttribute(($context["field"] ?? null), "multiple", []))) {
            // line 34
            echo "                ";
            $context["options"] = array_unique(twig_array_merge(($context["options"] ?? null), (((isset($context["value"]) || array_key_exists("value", $context))) ? (_twig_default_filter(($context["value"] ?? null), [])) : ([]))));
            // line 35
            echo "            ";
        }
        // line 36
        echo "
            ";
        // line 37
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["options"] ?? null));
        foreach ($context['_seq'] as $context["key"] => $context["item_value"]) {
            // line 38
            echo "                ";
            if ((twig_test_iterable($context["item_value"]) && $this->getAttribute($context["item_value"], "value", []))) {
                // line 39
                echo "                    ";
                $context["akey"] = ((($this->getAttribute(($context["field"] ?? null), "selectize", []) && $this->getAttribute(($context["field"] ?? null), "multiple", []))) ? ($context["item_value"]) : ($context["key"]));
                // line 40
                echo "                    ";
                $context["avalue"] = $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $this->getAttribute($context["item_value"], "value", []));
                // line 41
                echo "                    <option ";
                echo (($this->getAttribute($context["item_value"], "disabled", [])) ? ("disabled=\"disabled\"") : (""));
                echo "
                        ";
                // line 42
                echo (($this->getAttribute($context["item_value"], "selected", [])) ? ("selected=\"selected\"") : (""));
                echo "
                        ";
                // line 43
                (($this->getAttribute($context["item_value"], "label", [])) ? (print (twig_escape_filter($this->env, ("label=" . $this->getAttribute($context["item_value"], "label", [])), "html", null, true))) : (print ("")));
                echo "
                        value=\"";
                // line 44
                echo twig_escape_filter($this->env, $this->getAttribute($context["item_value"], "akey", []), "html", null, true);
                echo "\"
                    >
                        ";
                // line 46
                echo ($context["avalue"] ?? null);
                echo "
                    </option>
                ";
            } elseif (twig_test_iterable(            // line 48
$context["item_value"])) {
                // line 49
                echo "                    <optgroup label=\"";
                echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                echo "\">
                        ";
                // line 50
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable($context["item_value"]);
                foreach ($context['_seq'] as $context["subkey"] => $context["suboption"]) {
                    // line 51
                    echo "                            ";
                    $context["selected"] = (($this->getAttribute(($context["field"] ?? null), "selectize", [])) ? ($context["suboption"]) : ($context["subkey"]));
                    // line 52
                    echo "                            ";
                    $context["item_value"] = ((($this->getAttribute(($context["field"] ?? null), "selectize", []) && $this->getAttribute(($context["field"] ?? null), "multiple", []))) ? ($context["suboption"]) : ($context["subkey"]));
                    // line 53
                    echo "                            <option ";
                    if ((($context["subkey"] == ($context["value"] ?? null)) || ($this->getAttribute(($context["field"] ?? null), "multiple", []) && twig_in_filter(($context["selected"] ?? null), ($context["value"] ?? null))))) {
                        echo "selected=\"selected\"";
                    }
                    echo " value=\"";
                    echo twig_escape_filter($this->env, $context["suboption"], "html", null, true);
                    echo "\">
                                ";
                    // line 54
                    echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $context["suboption"]);
                    echo "
                            </option>
                        ";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['subkey'], $context['suboption'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 57
                echo "                    </optgroup>
                ";
            } else {
                // line 59
                echo "                    ";
                $context["selected"] = (($this->getAttribute(($context["field"] ?? null), "selectize", [])) ? ($context["item_value"]) : ($context["key"]));
                // line 60
                echo "                    ";
                $context["val"] = ((($this->getAttribute(($context["field"] ?? null), "selectize", []) && $this->getAttribute(($context["field"] ?? null), "multiple", []))) ? ($context["item_value"]) : ($context["key"]));
                // line 61
                echo "                    <option ";
                if (((($context["val"] ?? null) == ($context["value"] ?? null)) || ($this->getAttribute(($context["field"] ?? null), "multiple", []) && twig_in_filter(($context["selected"] ?? null), ($context["value"] ?? null))))) {
                    echo "selected=\"selected\"";
                }
                echo " value=\"";
                echo twig_escape_filter($this->env, ($context["val"] ?? null), "html", null, true);
                echo "\">";
                echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $context["item_value"]);
                echo "</option>
                ";
            }
            // line 63
            echo "            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['item_value'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 64
        echo "
        </select>
    </div>
";
    }

    public function getTemplateName()
    {
        return "forms/fields/select/select.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  284 => 64,  278 => 63,  266 => 61,  263 => 60,  260 => 59,  256 => 57,  247 => 54,  238 => 53,  235 => 52,  232 => 51,  228 => 50,  223 => 49,  221 => 48,  216 => 46,  211 => 44,  207 => 43,  203 => 42,  198 => 41,  195 => 40,  192 => 39,  189 => 38,  185 => 37,  182 => 36,  179 => 35,  176 => 34,  173 => 33,  171 => 32,  168 => 31,  162 => 30,  159 => 29,  156 => 28,  145 => 26,  140 => 25,  137 => 24,  131 => 22,  128 => 21,  121 => 20,  116 => 19,  111 => 18,  106 => 17,  101 => 16,  96 => 15,  91 => 14,  84 => 13,  78 => 12,  70 => 11,  66 => 10,  57 => 9,  54 => 8,  48 => 5,  43 => 4,  40 => 3,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/select/select.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/form/templates/forms/fields/select/select.html.twig");
    }
}
