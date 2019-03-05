<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/tim/Sites/CourseSuite/courseassembler.com/public/docs/user/plugins/email/email.yaml',
    'modified' => 1551061346,
    'data' => [
        'enabled' => true,
        'from' => NULL,
        'from_name' => NULL,
        'to' => NULL,
        'to_name' => NULL,
        'mailer' => [
            'engine' => 'sendmail',
            'smtp' => [
                'server' => 'localhost',
                'port' => 25,
                'encryption' => 'none',
                'user' => '',
                'password' => ''
            ],
            'sendmail' => [
                'bin' => '/usr/sbin/sendmail -bs'
            ]
        ],
        'content_type' => 'text/html',
        'debug' => false
    ]
];
