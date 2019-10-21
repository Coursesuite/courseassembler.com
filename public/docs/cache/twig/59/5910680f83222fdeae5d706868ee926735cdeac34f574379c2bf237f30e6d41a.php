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

/* forms/fields/toggle/toggle.html.twig */
class __TwigTemplate_eea8314fa07e052855f6980647316cf037555e589938be245a822adabe5a36d1 extends \Twig\Template
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
        // line 8
        $context["macro"] = $this;
        // line 10
        $context["value"] = (($context["value"]) ?? ($this->getAttribute(($context["field"] ?? null), "default", [])));
        // line 11
        $context["value"] = (((($context["value"] ?? null) === false)) ? (0) : (($context["value"] ?? null)));
        // line 13
        $context["has_hidden"] = false;
        // line 14
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["field"] ?? null), "options", []));
        foreach ($context['_seq'] as $context["key"] => $context["text"]) {
            // line 15
            if (twig_test_empty($context["key"])) {
                // line 16
                $context["has_hidden"] = true;
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['text'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/toggle/toggle.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 20
    public function block_global_attributes($context, array $blocks = [])
    {
        // line 21
        echo "  ";
        $this->displayParentBlock("global_attributes", $context, $blocks);
        echo "
  data-grav-field-name=\"";
        // line 22
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
        echo "\"
";
    }

    // line 25
    public function block_input($context, array $blocks = [])
    {
        // line 26
        echo "
  <div class=\"switch-toggle switch-grav ";
        // line 27
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo " switch-";
        echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute(($context["field"] ?? null), "options", [])), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "classes", []), "html", null, true);
        echo "\">
    ";
        // line 28
        $context["maxLen"] = 0;
        // line 29
        echo "    ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["field"] ?? null), "options", []));
        foreach ($context['_seq'] as $context["_key"] => $context["text"]) {
            // line 30
            echo "      ";
            $context["translation"] = twig_trim_filter($this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $context["text"]));
            // line 31
            echo "      ";
            $context["maxLen"] = max(twig_length_filter($this->env, ($context["translation"] ?? null)), ($context["maxLen"] ?? null));
            // line 32
            echo "    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['text'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 33
        echo "
    ";
        // line 34
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($this->getAttribute(($context["field"] ?? null), "options", []));
        foreach ($context['_seq'] as $context["key"] => $context["text"]) {
            // line 35
            echo "      ";
            $context["id"] = (("toggle_" . $this->getAttribute(($context["field"] ?? null), "name", [])) . $context["key"]);
            // line 36
            echo "      ";
            $context["translation"] = twig_trim_filter($this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate($this->env, $context["text"]));
            // line 37
            echo "
      <input type=\"radio\"
             value=\"";
            // line 39
            echo twig_escape_filter($this->env, $context["key"], "html", null, true);
            echo "\"
             id=\"";
            // line 40
            echo twig_escape_filter($this->env, ($context["id"] ?? null), "html", null, true);
            echo "\"
             name=\"";
            // line 41
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
            echo "\"
          ";
            // line 42
            if ($this->getAttribute(($context["field"] ?? null), "highlight", [], "any", true, true)) {
                // line 43
                echo "            class=\"";
                echo ((($this->getAttribute(($context["field"] ?? null), "highlight", []) == ("" . $context["key"]))) ? ("highlight") : (""));
                echo "\"
          ";
            }
            // line 45
            echo "          ";
            if (($this->getAttribute(($context["field"] ?? null), "disabled", []) || ($context["isDisabledToggleable"] ?? null))) {
                echo "disabled=\"disabled\"";
            }
            // line 46
            echo "          ";
            if ($this->getAttribute(($context["field"] ?? null), "toggleable", [])) {
                // line 47
                echo "            ";
                if ((("" . $context["key"]) == ("" . ($context["value"] ?? null)))) {
                    // line 48
                    echo "              checked=\"checked\"
            ";
                } elseif ((                // line 49
(isset($context["value"]) || array_key_exists("value", $context)) && (($context["key"] == 1) || ($context["key"] == "1")))) {
                    // line 50
                    echo "              checked=\"checked\"
            ";
                }
                // line 52
                echo "          ";
            } else {
                // line 53
                echo "            ";
                if ((("" . $context["key"]) == ("" . ($context["value"] ?? null)))) {
                    // line 54
                    echo "              checked=\"checked\"
            ";
                }
                // line 56
                echo "          ";
            }
            // line 57
            echo "          ";
            if (twig_in_filter($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "required", []), [0 => "on", 1 => "true", 2 => 1])) {
                echo "required=\"required\"";
            }
            // line 58
            echo "      />
      <label for=\"";
            // line 59
            echo twig_escape_filter($this->env, ($context["id"] ?? null), "html", null, true);
            echo "\">";
            echo twig_trim_filter($context["macro"]->getspanToggle(($context["translation"] ?? null), ($context["maxLen"] ?? null)));
            echo "</label>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['text'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 61
        echo "  </div>
";
    }

    // line 3
    public function getspanToggle($__input__ = null, $__length__ = null, ...$__varargs__)
    {
        $context = $this->env->mergeGlobals([
            "input" => $__input__,
            "length" => $__length__,
            "varargs" => $__varargs__,
        ]);

        $blocks = [];

        ob_start(function () { return ''; });
        try {
            // line 4
            echo "  ";
            $context["space"] = $this->env->getExtension('Grav\Common\Twig\TwigExtension')->repeatFunc("&nbsp;&nbsp;", ((($context["length"] ?? null) - twig_length_filter($this->env, ($context["input"] ?? null))) / 2));
            // line 5
            echo "  ";
            echo ((($context["space"] ?? null) . ($context["input"] ?? null)) . ($context["space"] ?? null));
            echo "
";
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
        return "forms/fields/toggle/toggle.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  218 => 5,  215 => 4,  202 => 3,  197 => 61,  187 => 59,  184 => 58,  179 => 57,  176 => 56,  172 => 54,  169 => 53,  166 => 52,  162 => 50,  160 => 49,  157 => 48,  154 => 47,  151 => 46,  146 => 45,  140 => 43,  138 => 42,  134 => 41,  130 => 40,  126 => 39,  122 => 37,  119 => 36,  116 => 35,  112 => 34,  109 => 33,  103 => 32,  100 => 31,  97 => 30,  92 => 29,  90 => 28,  82 => 27,  79 => 26,  76 => 25,  70 => 22,  65 => 21,  62 => 20,  57 => 1,  50 => 16,  48 => 15,  44 => 14,  42 => 13,  40 => 11,  38 => 10,  36 => 8,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/toggle/toggle.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/form/templates/forms/fields/toggle/toggle.html.twig");
    }
}
