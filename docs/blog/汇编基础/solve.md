## PTA 题目集

??? note "1 输入一个大写英文字母，输出该字母至'Z'的所有字母"

    ```asm
    ;本题要求:
    comment %
    以下程序的功能是从键盘输入一个大写英文字母c，
    再输出c至′Z′的所有字母
    例如：输入X，则应该输出XYZ
    ;请把以下代码补充完整
    %
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    data segment
    c    db 0
    data ends
    
    code segment
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;从键盘输入一个大写英文字母c，再输出c至′Z′的所有字母
    ;#1_begin-------------------------------------
        mov ah,1
        int 21h
    again:
        cmp al,'Z'
        jg done
    
        mov ah,2
        mov dl,al
        int 21h
    
        inc al
        jmp again
    done:
    ;#1_end=======================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "2 把16进制字符串转化成整数"

    ```asm
    ;本题要求:
    ;以下程序的功能是从键盘输入一行长度不超过8个字符的
    ;16进制字符串并保存到数组s中，再把该字符串转化成
    ;32位整数并保存到变量result中。注意字符串s一定以
    ;00h字符结束。
    ;例如：输入"8086CaFe"，则result的值=8086CAFEh。
    ;请把以下代码补充完整。
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    .386
    data segment use16
    sth db 10h dup(0)
    s   db 100h dup('S')
    result dd 0
    data ends
    
    code segment use16
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov si, offset s
    input_next:
       mov ah, 1
       int 21h; AL=getchar()
       cmp al, 0Dh; 判断是否为回车键
       je input_done
       mov [si], al
       add si, 1                     
       jmp input_next
    input_done:
       mov byte ptr [si], 0
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;把s中包含的16进制字符串转化成32位整数并保存到
    ;变量result中
    ;#1_begin-------------------------------------
        mov eax,0
        mov si,offset s
    do:
        mov ebx,0	;!!!
        mov bl,[si]
        cmp bl,0
        je done
        cmp bl,'9'
        jle is_digit
        is_ch:
            cmp bl,'F'
            jle is_upper
            is_lower:
                sub bl,'a'
                add bl,10
                jmp done_ch
            is_upper:
                sub bl,'A'
                add bl,10
            done_ch:
            jmp trans
        is_digit:
            sub bl,'0'
        trans:
        shl eax,4
        or eax,ebx
        add si,1
        jmp do
    done:
        mov [result],eax
    ;#1_end========================================
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "3 金字塔"

    ```asm
    ;本题要求:
    comment %
    以下程序的功能是从键盘输入一个字符c，再输出
    n层金字塔，其中n=c-'0'，首层空格数=n-1，后续
    各层空格数逐层减1，首层字符数=1，后续各层字符数
    逐层加2，每层输出的字符均固定为c。
    输出字符请调用int 21h的2号功能，不能通过写显卡
    地址实现字符输出。另外，输出最后一层时也需要在
    末尾输出0Dh及0Ah。
    例如：输入5，则应该输出
        5
       555
      55555
     5555555
    555555555
    ;请把以下代码补充完整
    %
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    data segment
    c    db 0
    rows dw 0
    spaces_on_this_row dw 0
    digits_on_this_row dw 0
    data ends
    
    code segment
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov ah, 1
       int 21h       ; AL=getchar()
       mov [c], al   ; 保存输入的字符到变量c中
       sub al, '0'   ; 把输入的数字字符脱掉引号
       mov ah, 0     ; AX的高8位清零
       mov [rows], ax; 总共需要输出的行数保存到变量rows中
       dec ax        ; ax--
       mov [spaces_on_this_row], ax; 首行需要输出的空格的个数
       mov [digits_on_this_row], 1 ; 首行需要输出的数字的个数
       cmp [rows], 0
       je exit
       mov ah, 2
       mov dl, 0Dh
       int 21h; 输出回车
       mov ah, 2
       mov dl, 0Ah
       int 21h; 输出换行
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;输出n层金字塔，其中n=c-'0'，首层空格数=n-1，后续
    ;各层空格数逐层减1，首层字符数=1，后续各层字符数
    ;逐层加2，每层输出的字符均固定为c。
    ;输出字符请调用int 21h的2号功能，不能通过写显卡
    ;地址实现字符输出。另外，输出最后一层时也需要在
    ;末尾输出0Dh及0Ah。
    ;#1_begin-------------------------------------
        mov cx,[rows]
    print:
        mov bx,[spaces_on_this_row]
        print_spaces:
            cmp bx,0	;注意注意注意
            je done_spaces
            mov ah,2
            mov dl,' '
            int 21h
            sub bx,1
            cmp bx,0
            ja print_spaces
        done_spaces:
        mov bx,[digits_on_this_row]
        print_digits:
            cmp bx,0
            je done_digits
            mov ah,2
            mov dl,[c]
            int 21h
            sub bx,1
            cmp bx,0
            ja print_digits
        done_digits:
        mov ah,2
        mov dl,0Dh
        int 21h
        mov ah,2
        mov dl,0Ah
        int 21h
        sub [spaces_on_this_row],1
        add [digits_on_this_row],2
        sub cx,1
        cmp cx,0
        ja print
    ;#1_end=======================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "4 逆序输出一个字符串"

    ```asm
    comment @---------------------------------------------------------------------
    题目描述:
    已知数组s中存储了一个符合C语言标准的字符串(末尾有一个ASCII码等于0的字符)，请在 
    #1_begin
       与  
    #1_end
    之间填写代码，按逆序输出s中的字符。
    例如：设s的内容为 
       abc123
    则应该输出 
       321cba
    ------------------------------------------------------------------------------@
    
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    data segment
    sth db 10h dup(0)
    s db "abc123", 0; 此数组的内容在judge时有可能会发生变化
    data ends
    
    code segment
    assume cs:code, ds:data
    main:
       mov ax, seg s
       mov ds, ax
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;按逆序输出s中的字符
    ;#1_begin--------------------------------------
        mov si,offset s
    do:
        mov al,[si]
        cmp al,0
        je done
        push ax
        add si,1
        jmp do
    done:
        mov si,offset s
    do2:
        mov al,[si]
        cmp al,0
        je done2
        pop dx
        mov ah,2
        int 21h
        add si,1
        jmp do2
    done2:
    ;#1_end========================================
    exit:
       mov ah, 4Ch
       mov al, 0
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "5 输入一个十进制数及一个十六进制数并求和"

    ```asm
    ;本题要求:
    ;1. 从键盘输入一个其值不超过4294967295的十进制数及一个其值不超过0FFFFFFFFh的十六进制数，
    ;   这两个数输入时均以回车结束，其中十进制数保存在数组d中，十六进制数保存在数组h中。
    ;2. 把d中的字符串转化成整数，把h中的字符串也转化成整数，求它们的和，结果保存到变量result中。
    ;   若求和时有进位，则丢弃该进位。
    ;3. 例如：输入
    ;   2147483647
    ;   8086CaFe
    ;   则result=0086CAFDh。
    ;请把以下代码补充完整。
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    .386
    data segment use16
    sth db 10h dup(0)
    d   db 20h dup('D')
    h   db 20h dup('H')
    result dd 0
    data ends

    code segment use16
    assume cs:code, ds:data
    main:
    ;请在#1_begin和#1_end之间补充代码
    ;#1_begin-------------------------------------
        mov ax,data
        mov ds,ax
        mov si,offset d
    read_d:
        mov ah,1
        int 21h
        cmp al,0Dh
        je read_d_done
        mov [si],al
        add si,1
        jmp read_d
    read_d_done:
        mov al,0
        mov [si],al
        mov si,offset h
    read_h:
        mov ah,1
        int 21h
        cmp al,0Dh
        je read_h_done
        mov [si],al
        add si,1
        jmp read_h
    read_h_done:
        mov al,0
        mov [si],al
        mov eax,0
        mov ecx,0
        mov si,offset d
    calc_d:
        mov cl,[si]
        cmp cl,0
        je calc_d_done
        sub cl,'0'
        imul eax,10
        add eax,ecx
        add si,1
        jmp calc_d
    calc_d_done:
        mov ebx,0
        mov si,offset h
    calc_h:
        mov cl,[si]
        cmp cl,0
        je calc_h_done
        cmp cl,'9'
        jle is_digit
        is_ch:
            cmp cl,'F'
            jle is_upper
            is_lower:
                sub cl,'a'
                add cl,10
                jmp done_ch
            is_upper:
                sub cl,'A'
                add cl,10
            done_ch:
            jmp done
        is_digit:
            sub cl,'0'
        done:
        shl ebx,4
        add ebx,ecx
        add si,1
        jmp calc_h
    calc_h_done:
        add eax,ebx
        mov [result],eax
    ;#1_end=======================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

## 作业

**第一次作业 10.1**

??? note "AX为正时计算2*AX否则计算AX的平方"

    ```asm
    .386
    code segment use16
    assume cs:code
    main:
       mov ax, -2; ax的值在评测时会发生改变
       ;#1_begin--------------------------------------
        cmp ax,0
        jg ax_ge_0
            imul ax,ax
            jmp done
        ax_ge_0:
            imul ax,2
            jmp done
        done:
       ;#1_end========================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ```

??? note "判断素数"

    ```asm
    .386
    code segment use16
    assume cs:code
    main:
       mov cx, 5; cx的值在评测时会发生改变
       ;#1_begin--------------------------------------
        mov bx,2
    
        again:
            cmp bx,cx
            jae check
    
            mov dx,0
            mov ax,cx
            div bx
    
            cmp dx,0
            je check
            add bx,1
            jmp again
        check:
            cmp bx,cx
            je equal
                mov ax,0
                jmp done
            equal:
                mov ax,1
                jmp done
            done:
       ;#1_end========================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ```

