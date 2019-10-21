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

/* partials/login.html.twig */
class __TwigTemplate_ea72cbd96739133f6faa68e660fa5a08a7754c99d906fd1fb50f0636a19ddd68 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->blocks = [
            'messages' => [$this, 'block_messages'],
            'body' => [$this, 'block_body'],
            'instructions' => [$this, 'block_instructions'],
            'integration' => [$this, 'block_integration'],
            'form' => [$this, 'block_form'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "partials/base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 2
        $context["scope"] = ((($context["scope"] ?? null)) ? (($context["scope"] ?? null)) : ("data."));
        // line 1
        $this->parent = $this->loadTemplate("partials/base.html.twig", "partials/login.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_messages($context, array $blocks = [])
    {
    }

    // line 5
    public function block_body($context, array $blocks = [])
    {
        // line 6
        echo "<body id=\"admin-login-wrapper\">
    <section id=\"admin-login\" class=\"login-box-shadow ";
        // line 7
        echo twig_escape_filter($this->env, ($context["classes"] ?? null), "html", null, true);
        echo "\">

        ";
        // line 9
        $this->loadTemplate("partials/login-logo.html.twig", "partials/login.html.twig", 9)->display($context);
        // line 10
        echo "
        ";
        // line 11
        $this->loadTemplate("partials/messages.html.twig", "partials/login.html.twig", 11)->display($context);
        // line 12
        echo "
        ";
        // line 13
        $this->displayBlock('instructions', $context, $blocks);
        // line 14
        echo "
        ";
        // line 15
        $this->displayBlock('integration', $context, $blocks);
        // line 16
        echo "
        ";
        // line 17
        $context["redirect"] = ((($context["redirect"] ?? null)) ? (($context["redirect"] ?? null)) : ((($this->getAttribute(($context["uri"] ?? null), "path", []) . $this->getAttribute(($context["uri"] ?? null), "params", [])) . (($this->getAttribute(($context["uri"] ?? null), "query", [])) ? (("?" . $this->getAttribute(($context["uri"] ?? null), "query", []))) : ("")))));
        // line 18
        echo "
        <form method=\"post\" action=\"";
        // line 19
        echo twig_escape_filter($this->env, ($context["base_url_relative"] ?? null), "html", null, true);
        echo "\">
            <div class=\"padding\">
                ";
        // line 21
        $this->displayBlock('form', $context, $blocks);
        // line 22
        echo "                <input type=\"hidden\" name=\"redirect\" value=\"";
        echo twig_escape_filter($this->env, ($context["redirect"] ?? null), "html", null, true);
        echo "\" />
                ";
        // line 23
        echo $this->env->getExtension('Grav\Common\Twig\TwigExtension')->nonceFieldFunc("admin-form", "admin-nonce");
        echo "
            </div>
        </form>

        <script>
            \$(document).ready( function() {
                \$('#messages').delay(5000).animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
            });
        </script>
    </section>
</body>
";
    }

    // line 13
    public function block_instructions($context, array $blocks = [])
    {
    }

    // line 15
    public function block_integration($context, array $blocks = [])
    {
    }

    // line 21
    public function block_form($context, array $blocks = [])
    {
    }

    public function getTemplateName()
    {
        return "partials/login.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  125 => 21,  120 => 15,  115 => 13,  99 => 23,  94 => 22,  92 => 21,  87 => 19,  84 => 18,  82 => 17,  79 => 16,  77 => 15,  74 => 14,  72 => 13,  69 => 12,  67 => 11,  64 => 10,  62 => 9,  57 => 7,  54 => 6,  51 => 5,  46 => 3,  41 => 1,  39 => 2,  33 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "partials/login.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/partials/login.html.twig");
    }
}
