const input_text = document.getElementById("input-text");
const input_name = document.getElementById("input-name");
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const images = document.getElementById("images");
const send_button = document.getElementById("send-button");
const img_num = 14;
const rotate_characters = ["ー", "～", "（", "）", "(", ")", "「", "」", "｛", "｝"];
const leftbottome_characters = ["、", "。"];
const small_characters = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ", "っ"];
const font_size = 30;
num = Math.ceil(Math.random()*img_num);

function set_images(){
    
    for (i=0; i<img_num; i++){
        img_element = document.createElement("img");
        img_element.id = `img-${i+1}`;
        img_element.src = `image/${(i+1).toString().padStart(2, "0")}.png`;
        images.appendChild(img_element);
        //イベント
        img_element.addEventListener("click", (event) => {
            num = parseInt(event.target.id.split("-")[1]);
            update_cvs();
        });
    }
}
function cvs_to_image()
{
  png = cvs.toDataURL();
  document.getElementById("haiku-image").src = png;
}
function init_cvs(){
    image = document.getElementById(`img-${num}`);
    //image.onload = () => ctx.drawImage(image, 0, 0);
    ctx.drawImage(image, 0, 0);
    console.log("背景描画")
}

function draw_character(char, x, y){
    if (rotate_characters.includes(char)){
        draw_rotate_character();
    }else if (leftbottome_characters.includes(char)){
        ctx.fillText(char, x+font_size*0.55, y-font_size*0.5);
    }else if (small_characters.includes(char)){
        ctx.fillText(char, x+font_size*0.1, y-font_size*0.15);
    }else{
        ctx.fillText(char, x, y);
    }

    function draw_rotate_character(){
        ctx.rotate(Math.PI/2);
        ctx.fillText(char, y-font_size*0.85, -x-font_size*0.165);
        ctx.rotate(-Math.PI/2);
    }
}
function update_cvs(){
    init_cvs();
    ctx.font = `${font_size}px serif`;
    text = input_text.value;
    name = input_name.value;
    ctx.fillStyle = num == 4 || num == 9 || num == 10 || num == 14? "white": "#101010";

    //本文
    //座標や行間の設定
    line_width = font_size * 1.5;
    y_start = 140;
    text_pos = [cvs.width/2 + (((text.match(/\n/g) || []).length)*line_width-font_size)/2, y_start];
    for (i=0; i<text.length; i++){
        draw_character(text.substr(i, 1), text_pos[0], text_pos[1]);

        //次の座標をセットする
        if (text.substr(i, 1) == "\n"){
            text_pos[0] -= line_width;
            text_pos[1] = y_start;
        }else{
            text_pos[1] += font_size;
        }
    }

    //名前
    name_font_size = 24;
    ctx.font = `${name_font_size}px serif`;

    name_pos = [20, cvs.height-50];
    for (i=0; i<name.length; i++){
        draw_character(name.substr(name.length-i-1, 1), name_pos[0], name_pos[1]);
        name_pos[1] -= name_font_size;
    }

    //imageに変換
    cvs_to_image();
}
function load(){
    set_images();
    init_cvs();

    send_button.addEventListener("click", update_cvs);
}

load();

