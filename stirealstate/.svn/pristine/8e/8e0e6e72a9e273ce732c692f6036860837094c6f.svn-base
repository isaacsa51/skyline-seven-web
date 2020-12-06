<?php defined('BASEPATH') OR exit('No direct script access allowed');

function getRulesAsociados(){
    return [
        [
            'field' => 'nombre',
            'label' => 'nombre',
            'rules' => 'required|max_length[70]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 70 carácteres'
            ],
        ],
        [
            'field' => 'apellido',
            'label' => 'apellido',
            'rules' => 'required|max_length[70]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 70 carácteres'
            ],
        ],
        [
            'field' => 'num_asociado',
            'label' => 'num_asociado',
            'rules' => 'required|is_natural|max_length[10]',
            'errors' => [
                'required' => '*Campo requerido',
                'is_natural' => '*Debe ser un número',
                'max_length' => '*Máximo 10 carácteres'
            ],
        ],
        [
            'field' => 'num_tienda',
            'label' => 'num_tienda',
            'rules' => 'required|is_natural|max_length[10]',
            'errors' => [
                'required' => '*Campo requerido',
                'is_natural' => '*Debe ser un número',
                'max_length' => '*Máximo 10 carácteres'
            ],
        ],
        [
            'field' => 'email',
            'label' => 'email',
            'rules' => 'required|max_length[70]|valid_email|regex_match[/@homedepot.com.mx$/]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 70 carácteres',
                'valid_email' => '*Formato de correo inválido',
                'regex_match' => '*Dominio debe ser @homedepot.com.mx'
            ],
        ],
        [
            'field' => 'password',
            'label' => 'password',
            'rules' => 'required|min_length[5]|max_length[30]',
            'errors' => [
                'required' => '*Campo requerido',
                'min_length' => '*Minimo 5 carácteres',
                'max_length' => '*Máximo 30 carácteres'
            ],
        ],
        [
            'field' => 'confirm_password',
            'label' => 'confirm_password',
            'rules' => 'matches[password]',
            'errors' => [
                'matches' => '*Las contraseñas no coinciden'
            ],
        ]
    ];
}
function getRulesTestimonios(){
    return [
        [
            'field' => 'nombre',
            'label' => 'nombre',
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 100 carácteres'
            ],
        ],
        [
            'field' => 'ciudad',
            'label' => 'ciudad',
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 100 carácteres'
            ],
        ],
        [
            'field' => 'descripcion',
            'label' => 'descripcion',
            'rules' => 'required|max_length[200]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 200 carácteres'
            ],
        ],
        [
            'field' => 'testimonio',
            'label' => 'testimonio',
            'rules' => 'required|max_length[200]',
            'errors' => [
                'required' => '*Campo requerido',
                'max_length' => '*Máximo 200 carácteres'
            ],
        ]
    ];
}