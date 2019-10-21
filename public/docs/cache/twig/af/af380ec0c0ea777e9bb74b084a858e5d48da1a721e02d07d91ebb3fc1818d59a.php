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

/* forms/fields/order/order.html.twig */
class __TwigTemplate_8de2ae6e5656a7b11d0d3bc4b4b35d12ff9eb7d678d9ec99b3201aef2181f2e5 extends \Twig\Template
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
        // line 3
        $context["value"] = (((null === ($context["value"] ?? null))) ? ($this->getAttribute(($context["field"] ?? null), "default", [])) : (($context["value"] ?? null)));
        // line 4
        $context["siblings"] = $this->getAttribute($this->getAttribute(($context["context"] ?? null), "parent", []), "children", []);
        // line 5
        $context["canOrder"] = $this->getAttribute(($context["context"] ?? null), "order", []);
        // line 6
        $context["vertical"] = ($this->getAttribute(($context["field"] ?? null), "style", []) == "vertical");
        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/order/order.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 8
    public function block_field($context, array $blocks = [])
    {
        // line 9
        echo "<div class=\"form-field grid pure-g";
        if (($context["vertical"] ?? null)) {
            echo " vertical";
        }
        echo "\">
    <div class=\"form-label";
        // line 10
        if ( !($context["vertical"] ?? null)) {
            echo " block size-1-3 pure-u-1-3";
        }
        echo "\">
        <label>
            ";
        // line 12
        if ($this->getAttribute(($context["field"] ?? null), "help", [])) {
            // line 13
            echo "            <span class=\"tooltip\" data-asTooltip-position=\"w\" title=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter(twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "help", []))), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute(($context["field"] ?? null), "label", [])), "html", null, true);
            echo "</span>
            ";
        } else {
            // line 15
            echo "            ";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute(($context["field"] ?? null), "label", [])), "html", null, true);
            echo "
            ";
        }
        // line 17
        echo "            ";
        echo ((twig_in_filter($this->getAttribute($this->getAttribute(($context["field"] ?? null), "validate", []), "required", []), [0 => "on", 1 => "true", 2 => 1])) ? ("<span class=\"required\">*</span>") : (""));
        echo "
        </label>
    </div>
    <div class=\"form-data";
        // line 20
        if ( !($context["vertical"] ?? null)) {
            echo " block size-2-3 pure-u-2-3";
        }
        echo "\">
        <div class=\"form-order-wrapper ";
        // line 21
        echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "size", []), "html", null, true);
        echo "\">

            <input
                type=\"hidden\"
                data-order
                ";
        // line 26
        if (($this->getAttribute(($context["field"] ?? null), "disabled", []) || ($context["isDisabledToggleable"] ?? null))) {
            echo "disabled=\"disabled\"";
        }
        // line 27
        echo "                name=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
        echo "\"
                value=\"\" />
            ";
        // line 29
        if ( !($context["canOrder"] ?? null)) {
            // line 30
            echo "                <div class=\"notice\">";
            echo $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_PAGE_NO_PREFIX");
            echo "</div>
            ";
        }
        // line 32
        echo "
            ";
        // line 33
        if ((twig_length_filter($this->env, ($context["siblings"] ?? null)) < 200)) {
            // line 34
            echo "                ";
            $context["sortable_count"] = 0;
            // line 35
            echo "                <ul id=\"ordering\" class=\"orderable ";
            echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "classes", []), "html", null, true);
            echo "\">
                ";
            // line 36
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["siblings"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            foreach ($context['_seq'] as $context["_key"] => $context["page"]) {
                if ($this->getAttribute($context["page"], "order", [])) {
                    // line 37
                    echo "                    <li class=\"drag-handle\" data-id=\"";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "slug", []), "html", null, true);
                    echo "\" ";
                    echo ((($this->getAttribute($context["page"], "slug", []) == $this->getAttribute(($context["data"] ?? null), "slug", []))) ? ("data-active-id") : (""));
                    echo "><span class=\"page-order\">";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "order", []), "html", null, true);
                    echo "</span> ";
                    echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "title", []));
                    echo " <a href=\"";
                    echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->getPageUrl($context, $context["page"]), "html", null, true);
                    echo "\"><i class=\"fa fa-external-link\"></i></a></li>
                    ";
                    // line 38
                    $context["sortable_count"] = $this->getAttribute($context["loop"], "index", []);
                    // line 39
                    echo "                ";
                    ++$context['loop']['index0'];
                    ++$context['loop']['index'];
                    $context['loop']['first'] = false;
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['page'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 40
            echo "                </ul>
                ";
            // line 41
            if ((($context["sortable_count"] ?? null) < twig_length_filter($this->env, ($context["siblings"] ?? null)))) {
                // line 42
                echo "                <label>";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.UNSORTABLE_PAGES"), "html", null, true);
                echo "</label>
                <ul class=\"orderable disabled\">
                    ";
                // line 44
                $context['_parent'] = $context;
                $context['_seq'] = twig_ensure_traversable(($context["siblings"] ?? null));
                foreach ($context['_seq'] as $context["_key"] => $context["page"]) {
                    if ( !$this->getAttribute($context["page"], "order", [])) {
                        // line 45
                        echo "                        <li ";
                        echo ((($this->getAttribute($context["page"], "slug", []) == $this->getAttribute(($context["data"] ?? null), "slug", []))) ? ("data-active-id") : (""));
                        echo ">";
                        echo twig_escape_filter($this->env, $this->getAttribute($context["page"], "title", []));
                        echo " <a href=\"";
                        echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->getPageUrl($context, $context["page"]), "html", null, true);
                        echo "\"><i class=\"fa fa-external-link\"></i></a></li>
                    ";
                    }
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['page'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 47
                echo "                </ul>
                ";
            }
            // line 49
            echo "            ";
        } else {
            // line 50
            echo "                <div class=\"notice\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.ORDERING_DISABLED_BECAUSE_TOO_MANY_SIBLINGS"), "html", null, true);
            echo "</div>
            ";
        }
        // line 52
        echo "        </div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "forms/fields/order/order.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  212 => 52,  206 => 50,  203 => 49,  199 => 47,  185 => 45,  180 => 44,  174 => 42,  172 => 41,  169 => 40,  159 => 39,  157 => 38,  144 => 37,  133 => 36,  128 => 35,  125 => 34,  123 => 33,  120 => 32,  114 => 30,  112 => 29,  106 => 27,  102 => 26,  94 => 21,  88 => 20,  81 => 17,  75 => 15,  67 => 13,  65 => 12,  58 => 10,  51 => 9,  48 => 8,  43 => 1,  41 => 6,  39 => 5,  37 => 4,  35 => 3,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/order/order.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/forms/fields/order/order.html.twig");
    }
}
