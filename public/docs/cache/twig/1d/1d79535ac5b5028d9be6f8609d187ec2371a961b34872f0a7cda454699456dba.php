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

/* partials/breadcrumbs.html.twig */
class __TwigTemplate_9d71dbfcc1c837f61a585dfe024551c47f76ccd9f362e0c2ec99be7e63698a25 extends \Twig\Template
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
        $context["crumbs"] = $this->getAttribute(($context["breadcrumbs"] ?? null), "get", [], "method");
        // line 2
        $context["breadcrumbs_config"] = $this->getAttribute($this->getAttribute(($context["config"] ?? null), "plugins", []), "breadcrumbs", []);
        // line 3
        $context["divider"] = $this->getAttribute(($context["breadcrumbs_config"] ?? null), "icon_divider_classes", []);
        // line 4
        echo "
";
        // line 5
        if (((twig_length_filter($this->env, ($context["crumbs"] ?? null)) > 1) || $this->getAttribute(($context["breadcrumbs_config"] ?? null), "show_all", []))) {
            // line 6
            echo "<div id=\"breadcrumbs\" itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">
    ";
            // line 7
            if ($this->getAttribute(($context["breadcrumbs_config"] ?? null), "icon_home", [])) {
                // line 8
                echo "    <i class=\"";
                echo $this->getAttribute(($context["breadcrumbs_config"] ?? null), "icon_home", []);
                echo "\"></i>
    ";
            }
            // line 10
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["crumbs"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["_key"] => $context["crumb"]) {
                // line 11
                echo "        ";
                if ( !$this->getAttribute($context["loop"], "last", [])) {
                    // line 12
                    echo "            ";
                    if ($this->getAttribute($context["crumb"], "routable", [])) {
                        // line 13
                        echo "                <a href=\"";
                        echo $this->getAttribute($context["crumb"], "url", []);
                        echo "\" itemprop=\"url\"><span itemprop=\"title\">";
                        echo $this->getAttribute($context["crumb"], "menu", []);
                        echo "</span></a>
            ";
                    } else {
                        // line 15
                        echo "                <span itemprop=\"title\">";
                        echo $this->getAttribute($context["crumb"], "menu", []);
                        echo "</span>
            ";
                    }
                    // line 17
                    echo "            <i class=\"";
                    echo ($context["divider"] ?? null);
                    echo "\"></i>
        ";
                } else {
                    // line 19
                    echo "            ";
                    if ($this->getAttribute(($context["breadcrumbs_config"] ?? null), "link_trailing", [])) {
                        // line 20
                        echo "                <a href=\"";
                        echo $this->getAttribute($context["crumb"], "url", []);
                        echo "\" itemprop=\"url\"><span itemprop=\"title\">";
                        echo $this->getAttribute($context["crumb"], "menu", []);
                        echo "</span></a>
            ";
                    } else {
                        // line 22
                        echo "                <span itemprop=\"title\">";
                        echo $this->getAttribute($context["crumb"], "menu", []);
                        echo "</span>
            ";
                    }
                    // line 24
                    echo "        ";
                }
                // line 25
                echo "    ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['crumb'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 26
            echo "</div>
";
        }
    }

    public function getTemplateName()
    {
        return "partials/breadcrumbs.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  130 => 26,  116 => 25,  113 => 24,  107 => 22,  99 => 20,  96 => 19,  90 => 17,  84 => 15,  76 => 13,  73 => 12,  70 => 11,  52 => 10,  46 => 8,  44 => 7,  41 => 6,  39 => 5,  36 => 4,  34 => 3,  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/breadcrumbs.html.twig", "/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/plugins/breadcrumbs/templates/partials/breadcrumbs.html.twig");
    }
}
