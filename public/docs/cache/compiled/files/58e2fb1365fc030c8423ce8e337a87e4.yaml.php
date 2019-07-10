<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/config/site.yaml',
    'modified' => 1551061534,
    'data' => [
        'title' => 'Course Assembler',
        'default_lang' => 'en',
        'author' => [
            'name' => 'CourseSuite',
            'email' => 'info@coursesuite.com'
        ],
        'taxonomies' => [
            0 => 'category',
            1 => 'tag'
        ],
        'metadata' => [
            'description' => 'Documentation for the Course Assembler'
        ],
        'summary' => [
            'enabled' => true,
            'format' => 'short',
            'size' => 300,
            'delimiter' => '==='
        ],
        'blog' => [
            'route' => '/blog'
        ]
    ]
];
