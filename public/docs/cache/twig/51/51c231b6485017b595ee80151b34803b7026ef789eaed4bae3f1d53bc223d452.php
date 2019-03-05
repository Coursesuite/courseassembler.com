<?php

/* error.html.twig */
class __TwigTemplate_9c8454e711d8f9b523b42428ceec37092f7568f3ff681e03f48d4c7b681cecae extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("partials/base.html.twig", "error.html.twig", 1);
        $this->blocks = [
            'topbar' => [$this, 'block_topbar'],
            'navigation' => [$this, 'block_navigation'],
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        return "partials/base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_topbar($context, array $blocks = [])
    {
    }

    // line 4
    public function block_navigation($context, array $blocks = [])
    {
    }

    // line 6
    public function block_content($context, array $blocks = [])
    {
        // line 7
        echo "\t<div id=\"chapter\">
    \t<div id=\"body-inner\">
    \t\t<h1>";
        // line 9
        echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->translate("PLUGIN_ERROR.ERROR");
        echo " ";
        echo $this->getAttribute(($context["header"] ?? null), "http_response_code", []);
        echo "</h1>

            ";
        // line 11
        echo $this->getAttribute(($context["page"] ?? null), "content", []);
        echo "

\t\t</div>
    </div>
";
    }

    public function getTemplateName()
    {
        return "error.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  54 => 11,  47 => 9,  43 => 7,  40 => 6,  35 => 4,  30 => 3,  11 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "error.html.twig", "/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/themes/learn2/templates/error.html.twig");
    }
}
