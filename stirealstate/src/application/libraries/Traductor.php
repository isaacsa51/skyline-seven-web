<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Traductor {
    public function __construct()
	{
        $this->CI =& get_instance();

        $this->etiqueta = 'trans';
       /* $this->load->library('parser');
        /*$CI->load->helper('url');
        $CI->load->model('M_landing_campos');*/
	}

    public function traducir(&$page, $admin_edit, $id_landing){
        $this->CI->load->library('parser');
        $this->CI->load->model('M_landing_campos');
        $this->CI->load->model('M_landing_images');
        
        $urldefault = '/assets/img/landing_defaults/';

        preg_match_all('/\{\$([0-9a-zA-Z_\-áéíóú]+)\}/', $page, $regs);
        $keysimages = array_unique($regs[1]);

        preg_match_all('/\{\+([0-9a-zA-Z_\-áéíóú]+)\}/', $page, $regs);
        $keysattractions = array_unique($regs[1]);

        /*foreach($attractionkeys as $key => $value){
            $attractionsimages[$value] = $this->M_landing_images->getLandingAttractionImages($value);
        }*/

        if($admin_edit){
            /*OBTENER TODAS LAS CLAVES QUE ESTÉN COMO ATRIBUTOS DE ETIQUETAS*/
            $page= preg_replace_callback('/<[^>]*\{:[0-9a-z_\-]+\}[^>]*>/iU', array($this,'tagReplaceCallback'), $page);

            /*OBTENER LLAVES QUE NO SON VISIBLES EN LA PÁGINA*/
            if(!empty($this->specialKeys)){
			    if(!is_array($this->specialKeys)){
			        $this->specialKeys=array();
                }
			    $this->specialKeys = array_unique($this->specialKeys);
				preg_match_all('/\{:([0-9a-zA-Z_\-áéíóú]+)\}/',$page,$regs);
				$keys = array_unique($regs[1]);
				$this->specialKeys = array_diff($this->specialKeys,$keys);
				if(!empty($this->specialKeys)){
                    $specialKeys='<fieldset style="background:#ccc;text-align:left;"><legend style="background:#ccc">Traducciones faltantes(Title Pagina, Description, Keywords y URLS)</legend><ul>';
                    foreach($this->specialKeys as $key){
						if(substr($key,(strlen($key))-3,  strlen($key)) != 'url' /*|| $this->controller->Auth->user('grupo_id')== GRUPO_SISTEMA*/){
							$specialKeys.='<li>{:'.$key."} ---&gt;<span>Mensaje Invisible</span></li>";
						}
                    }
                    $specialKeys.="</ul></fieldset>";
					$this->specialKeys = $specialKeys;
					//$this->specialKeys = sprintf('<fieldset style="background:#ccc;text-align:left"><legend style="background:#ccc">Traducciones faltantes</legend><ul><li>{:%s} ---&gt; Mensaje invisible</li></ul></fieldset>',implode('} ---&gt; Mensaje invisible</li><li>{:',$this->specialKeys));
					$page = preg_replace('/(<\/body>)/iU',$this->specialKeys.'$1 ',$page);
					preg_match_all('/\{:([0-9a-zA-Z_\-áéíóú]+)\}/',$page,$regs);
					$keys = array_unique($regs[1]);
				}
            }

            /*OBTENER LAS CLAVES DE LAS IMAGENES*/
            $page= preg_replace_callback('/<img[^>]*\{\$[0-9a-z_\-]+\}\}[^>]*>/iU', array($this,'tagReplaceImagesCallback'), $page);

            /**CAMBIANDO INPUTS*/
            
            $data_landing = 'data-landing-input="$1"';

            $frase='<'.$this->etiqueta.' '.$data_landing.' title="$1">';
            $frase.='{:$1}';
            $frase.='</'.$this->etiqueta.'>';
            $page=preg_replace('/\{:([0-9a-zA-Z_\-áéíóú]+)\}(?<!<\/trans>)/', $frase, $page);
            
            /*Para quitar el ID del landing*/
            //$page = preg_replace('/\{:([0-9a-zA-Z_\-áéíóú]+)(_lp[\d]+)\}/', '{:$1}', $page);

            /**CAMBIANDO IMAGES*/

            $data_landing_image = 'data-landing-image="$3"';

            $frase='<img alt="$3" ' . $data_landing_image . ' src="$2" title="$3" $4>';
        
            $page=preg_replace('/<img([^>]*(\{\$([0-9a-z_\-áéíóú]+)\})([^>]*)>)/iU', $frase, $page);

            //Eliminar todos los estilos posibles que puedan haber sido asignados al span
            $estilos=array(
                'margin:0',
                'padding:0',
                'border:none',
                'background:transparent none',
                'font:inherit',
                'text-indent:0',
                'text-align:inherit',
                'text-decoration:none',
                'letter-spacing:inherit',
                'word-spacing:inherit',
                'text-transform:inherit',
                'white-space:inherit',
                'color:inherit',
                'float:none',
                'display:inline',
                'min-width:1px',
                'min-height:1em'
            );

            $page=preg_replace('/<script.*<\/script>/iUs','',$page);//Eliminamos scripts
            $page=preg_replace('/(<input [^>]+)on[a-z] *=(\'|").+\2/iUs','$1 ',$page); //Quitar eventos
            $page=preg_replace('/(<button [^>]+)on[a-z] *=(\'|").+\2/iUs','$1 ',$page);//Quitar eventos
            $page=preg_replace('/<a ([^>]*href=(\'|"))/iUs','<a onclick=$2return false;$2 $1 ',$page);
            $page=preg_replace('/<input /iUs','<input disabled="disabled" onclick="return false;" ',$page);
            $page=preg_replace('/<button /iUs','<button disabled="disabled" onclick="return false;" ',$page);
            $page=preg_replace('/<select/iUs','<select disabled="disabled" onclick="return false;" ',$page);
            $page=preg_replace('/(<\/head>)/i','<!--[if IE]><script type="text/javascript">document.createElement("trans");</script><![endif]--><style>div.traductor{'.implode(' !important;',$estilos).' !important}'.$this->etiqueta.'.mouseover{outline:1px dotted #000000;cursor:text !important;background:url(/img/semitransparente.png) !important}* html '.$this->etiqueta.'.mouseover{margin:-1px !important;border:1px dotted #000 !important;background:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/img/tdrasparente.png\',sizingMethod:\'scale\');}</style>$1',$page);
            
            $page .= '<div id="overlay-landing"></div>';
            $page .= '<link rel="stylesheet" type="text/css" href="/assets/css/landing_admin_edit.css">';
            $page .= '<script type="text/javascript" src="/assets/js/jquery-1.11.3.min.js"></script>';
            $page .= '<script type="text/javascript">var in_preview = "1";</script>';
            $page .= '<script type="text/javascript" src="/assets/js/qr/Landings/admin_landings.js"></script>';
        }
        
        $this->specialKeys = array();
        $page = preg_replace_callback('/<(title|option|button|script)[^>]*>(.*)<\/\1>/iU',array($this,'specialTagReplaceCallback'),$page);
        if(!empty($this->specialKeys)){
            $this->specialKeys = array_unique($this->specialKeys);
            $this->specialKeys = Set::filter($this->specialKeys);
            if(!empty($this->specialKeys)){
                $this->specialKeys = sprintf('<fieldset style="background:#ccc;text-align:left;"><legend style="background:#ccc;">Traducciones faltantes (Title, Botones, Combobox, etc)</legend><ul><li>{:%s} ---&gt; Texto especial</li></ul></fieldset>',implode('} ---&gt; Texto especial</li><li>{:',$this->specialKeys));
                $page = preg_replace('/(<\/body>)/iU',$this->specialKeys.'$1 ',$page);
            }
        }

        $page=preg_replace('/(<[^>]*){:([0-9a-zA-Z_\-]+)\}/iUs','$1',$page);
        //$page=preg_replace('/(<[^>]*){\+([0-9a-zA-Z_\-]+)\}/iUs','$1$2',$page);
        $page=preg_replace('/(<a [^>]+)on[a-z] *=(\'|").+\2/iUs','$1 ',$page);

        /*OBTENIENDO DE LA BASE DE DATOS LAS IMAGENES*/
        if(!empty($keysimages)){
            $asocimages = array();

			foreach($keysimages as $key => $value){
				$asocimages[$value] = '';
			}

            $images = $this->CI->M_landing_images->getLandingImages($keysimages);
            $images = array_merge($asocimages, $images);

            foreach($images as $key => $value){
                if(empty($value)){
                    $urlimage = preg_replace('/(_lp[\d]+)/s', '_default.png' , $key);

                    $images[$key] = $urldefault . $urlimage;
                }
            }

            $this->CI->parser->set_delimiters('{$','}');
            $page = $this->CI->parser->parse_string($page, $images, TRUE);
        }

        /*GENERANDO LOS ATTRACTIONS*/
        $imagesattraction = array();
        
        if(!empty($keysattractions)){
            $tpl = '';

            foreach($keysattractions as $attactionkey => $value){
                $imagesattraction = $this->CI->M_landing_images->getLandingAttractionImages($value);

                preg_match('/<\s*div data-landing-attraction="\{\+'.$value.'\}"[^>]*>/',$page, $attractiontag);

                preg_match('/wtext="true"/',$attractiontag[0], $wtext);

                preg_match('/wthumbs="true"/',$attractiontag[0], $wthumbs);
                
                preg_match('/wpagination="true"/',$attractiontag[0], $wpagination);

                preg_match_all('/numberimg="([0-9])+"/',$attractiontag[0], $numberimg);

                $attractiontext = array();
                
                $data_landing_attraction = 'data-landing-attraction="$2"';

                $tpl.='<div data-landing-attraction="$2"' . $data_landing_attraction . ' $3>';
                $tpl.='<ul class="swiper-wrapper">';

                if(count($imagesattraction) > 0){
                    foreach($imagesattraction as $imagekey => $image){
                        $tpl.=  '<li class="swiper-slide">';
                        $tpl.= '<img src="' . base_url($image['url']) . '">';

                        if(count($wtext) > 0){
                            $keyimagetext = $value . '_image_text_' . ($imagekey+1);

                            $auxarray = array($keyimagetext);

                            $texto = $this->CI->M_landing_campos->getLandingCampos($auxarray);                      

                            $tpl.='<div class="text-container">';
                            $tpl.='<p class="paragraph-slide">'. $texto[$keyimagetext] . '</p>';
                            $tpl.='</div>';
                        }

                        $tpl.= '</li>';

                        if($admin_edit) break;
                    }    
                }else{
                    if($admin_edit){
                        $tpl.=  '<li class="swiper-slide">';
                        $tpl.= '<img src="' . base_url($urldefault . preg_replace('/(_lp[\d]+)/s', '_default.png' , $value)) . '">';
                        $tpl.= '</li>';
                    }
                }
                
                $tpl.='</ul>'; //$6 counter div

                if(count($wpagination) > 0){
                    $tpl.='<div class="swiper-pagination"></div>';
                }

                $tpl.='</div>';

                if(count($wthumbs) > 0){
                    $tpl.='<div class="swiper-container gallery-thumbs">';
                    $tpl.='<div class="swiper-wrapper">';
                    
                    foreach($imagesattraction as $imagekey => $image){
                        $tpl.='<div class="swiper-slide">';
                        $tpl.='<div class="img-container">';
                        $tpl.='<img src="' . base_url($image['url']) . '">';
                        $tpl.='</div>';
                        $tpl.='<i class="icon-check"></i>';
                        $tpl.= '</div>';

                        if($admin_edit) break;	
                    }    

                    $tpl.='</div>';
                    $tpl.='</div>';
                }

                $page=preg_replace('/(<\s*div data-landing-attraction="\{\+('.$value.')\}"([^>]*)>)([.\s\S]*?)<\/div>/',$tpl,$page);
            }

            

            //$page=preg_replace('/(<[^>]*){+''\}/iUs','$1',$page);
        }

        return $page;
    }

    public function tagReplaceCallback($p){
		preg_match_all('/\{:([a-z0-9_\-]+)\}/i',$p[0],$keys);
		if(empty($this->specialKeys)){
			$this->specialKeys = $keys[1];
		}else{
			$this->specialKeys = array_merge($this->specialKeys,$keys[1]);
        }
        
        return preg_replace('/\{:[a-z0-9_\-]+\}/i','',$p[0]);
    }
    
    public function tagReplaceImagesCallback($p){
		preg_match_all('/\{\{([a-z0-9_\-]+)\}\}/i',$p[0],$keys);
		if(empty($this->KeysImages)){
			$this->KeysImages = $keys[1];
		}else{
			$this->KeysImages = array_merge($this->KeysImages,$keys[1]);
        }
        
        return preg_replace('/\{\{[a-z0-9_\-]+\}\}/i','',$p[0]);
	}

    public function specialTagReplaceCallback($p){
		preg_match_all('/\{:([a-z0-9_\-]+)\}/i',$p[2],$keys);
		if(empty($this->specialKeys)){
			$this->specialKeys = $keys[1];
		}else{
			$this->specialKeys = array_merge($this->specialKeys,$keys[1]);
		}
		return $p[0];
	}
}

?>