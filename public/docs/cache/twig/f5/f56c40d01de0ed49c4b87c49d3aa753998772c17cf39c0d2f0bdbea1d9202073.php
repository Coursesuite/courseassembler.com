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

/* forms/fields/pagemedia/pagemedia.html.twig */
class __TwigTemplate_7d76666be95834bd0ab7122b558b9629fd9b786fda060b3feaf2ef4d4dab16ac extends \Twig\Template
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
        // line 1
        $this->parent = $this->loadTemplate("forms/field.html.twig", "forms/fields/pagemedia/pagemedia.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 5
    public function block_field($context, array $blocks = [])
    {
        // line 6
        if ($this->getAttribute(($context["context"] ?? null), "folderExists", [])) {
            // line 7
            echo "    ";
            $context["pagemedia"] = $this->getAttribute(($context["config"] ?? null), "get", [0 => "plugins.admin.pagemedia"], "method");
            // line 8
            echo "    ";
            $context["pagemedia_settings"] = ["resolution" => ["min" => ["width" => (($this->getAttribute(            // line 11
($context["pagemedia"] ?? null), "res_min_width", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "res_min_width", [])) : (null)), "height" => (($this->getAttribute(            // line 12
($context["pagemedia"] ?? null), "res_min_height", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "res_min_height", [])) : (null))], "max" => ["width" => (($this->getAttribute(            // line 15
($context["pagemedia"] ?? null), "res_max_width", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "res_max_width", [])) : (null)), "height" => (($this->getAttribute(            // line 16
($context["pagemedia"] ?? null), "res_max_height", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "res_max_height", [])) : (null))]], "resizeWidth" => (($this->getAttribute(            // line 19
($context["pagemedia"] ?? null), "resize_width", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "resize_width", [])) : (null)), "resizeHeight" => (($this->getAttribute(            // line 20
($context["pagemedia"] ?? null), "resize_height", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "resize_height", [])) : (null)), "resizeQuality" => (($this->getAttribute(            // line 21
($context["pagemedia"] ?? null), "resize_quality", [])) ? ($this->getAttribute(($context["pagemedia"] ?? null), "resize_quality", [])) : (0.8))];
            // line 23
            echo "
    ";
            // line 24
            $context["media_url"] = (($this->getAttribute(($context["form"] ?? null), "getMediaTaskRoute", [], "method")) ? ($this->getAttribute(($context["form"] ?? null), "getMediaTaskRoute", [], "method")) : ((("/media/" . twig_trim_filter($this->getAttribute(($context["admin"] ?? null), "route", []), "/")) . ".json")));
            // line 25
            echo "    ";
            $context["media_local"] = (($this->getAttribute(($context["form"] ?? null), "getMediaRoute", [], "method")) ? ($this->getAttribute(($context["form"] ?? null), "getMediaRoute", [], "method")) : ((($this->env->getExtension('Grav\Common\Twig\TwigExtension')->rtrimFilter(($context["base_url_relative_frontend"] ?? null), "/") . "/") . twig_trim_filter($this->getAttribute(($context["admin"] ?? null), "route", []), "/"))));
            // line 26
            echo "    ";
            $context["media_path"] = $this->env->getExtension('Grav\Common\Twig\TwigExtension')->urlFunc($this->getAttribute(($context["context"] ?? null), "relativePagePath", []));
            // line 27
            echo "    ";
            $context["media_uri"] = $this->getAttribute(($context["context"] ?? null), "mediaUri", [], "method");
            // line 28
            echo "    ";
            $context["dropzone_settings"] = twig_array_merge(["maxFilesize" => ($context["form_max_filesize"] ?? null)], ($context["pagemedia_settings"] ?? null));
            // line 29
            echo "
    <div class=\"form-field grid vertical ";
            // line 30
            if ($this->getAttribute(($context["field"] ?? null), "classes", [], "any", true, true)) {
                echo twig_escape_filter($this->env, $this->getAttribute(($context["field"] ?? null), "classes", []), "html", null, true);
            }
            echo "\">
    <div class=\"form-label\">
        <label>";
            // line 32
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter($this->getAttribute(($context["field"] ?? null), "label", [])), "html", null, true);
            echo "</label>
    </div>
    <div class=\"form-data form-uploads-wrapper\">
        <div id=\"grav-dropzone\"
             class=\"dropzone\"
             data-media-url=\"";
            // line 37
            echo twig_escape_filter($this->env, (($context["base_url"] ?? null) . ($context["media_url"] ?? null)), "html_attr");
            echo "\"
             data-media-local=\"";
            // line 38
            echo twig_escape_filter($this->env, ($context["media_local"] ?? null), "html_attr");
            echo "\"
             data-media-path=\"";
            // line 39
            echo twig_escape_filter($this->env, ($context["media_path"] ?? null), "html_attr");
            echo "\"
             data-media-uri=\"";
            // line 40
            echo twig_escape_filter($this->env, ($context["media_uri"] ?? null), "html_attr");
            echo "\"
             data-dropzone-options=\"";
            // line 41
            echo twig_escape_filter($this->env, twig_jsonencode_filter(($context["dropzone_settings"] ?? null)), "html_attr");
            echo "\"
             data-dropzone-field=\"";
            // line 42
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
            echo "\"></div>

        ";
            // line 44
            if (($this->getAttribute($this->getAttribute(($context["admin"] ?? null), "session", []), "expert", []) == "0")) {
                // line 45
                echo "        <input type=\"hidden\" name=\"";
                echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Common\Twig\TwigExtension')->fieldNameFilter((($context["scope"] ?? null) . $this->getAttribute(($context["field"] ?? null), "name", []))), "html", null, true);
                echo "\" value=\"";
                echo twig_escape_filter($this->env, ($context["value"] ?? null));
                echo "\" />
        ";
            }
            // line 47
            echo "    </div>
</div>
";
        } else {
            // line 50
            echo "<div class=\"form-tab\">
    <div class=\"form-field\">
        <div class=\"form-label\">
            ";
            // line 53
            echo twig_escape_filter($this->env, $this->env->getExtension('Grav\Plugin\Admin\Twig\AdminTwigExtension')->tuFilter("PLUGIN_ADMIN.CANNOT_ADD_MEDIA_FILES_PAGE_NOT_SAVED"), "html", null, true);
            echo "
        </div>
    </div>
</div>
";
        }
    }

    public function getTemplateName()
    {
        return "forms/fields/pagemedia/pagemedia.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  140 => 53,  135 => 50,  130 => 47,  122 => 45,  120 => 44,  115 => 42,  111 => 41,  107 => 40,  103 => 39,  99 => 38,  95 => 37,  87 => 32,  80 => 30,  77 => 29,  74 => 28,  71 => 27,  68 => 26,  65 => 25,  63 => 24,  60 => 23,  58 => 21,  57 => 20,  56 => 19,  55 => 16,  54 => 15,  53 => 12,  52 => 11,  50 => 8,  47 => 7,  45 => 6,  42 => 5,  37 => 1,  35 => 3,  29 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "forms/fields/pagemedia/pagemedia.html.twig", "/var/www/www.courseassembler.com/public/docs/user/plugins/admin/themes/grav/templates/forms/fields/pagemedia/pagemedia.html.twig");
    }
}
