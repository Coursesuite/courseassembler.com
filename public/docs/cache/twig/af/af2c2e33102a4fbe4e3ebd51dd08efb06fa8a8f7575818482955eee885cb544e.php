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

/* partials/nav-user-avatar.html.twig */
class __TwigTemplate_0ee19d0f8a695730ac87b803599c1741ff959fa69cc4cba4bf7e60fad188763c extends \Twig\Template
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
        $context["user_avatar"] = $this->getAttribute($this->getAttribute(($context["admin"] ?? null), "user", []), "getAvatarUrl", [], "method");
        // line 2
        echo "<img src=\"";
        echo twig_escape_filter($this->env, ((!twig_in_filter("?", ($context["user_avatar"] ?? null))) ? ((($context["user_avatar"] ?? null) . "?s=80")) : (($context["user_avatar"] ?? null))), "html", null, true);
        echo "\" />
";
    }

    public function getTemplateName()
    {
        return "partials/nav-user-avatar.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  32 => 2,  30 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/nav-user-avatar.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/nav-user-avatar.html.twig");
    }
}
