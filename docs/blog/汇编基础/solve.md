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


??? note "6 输入一行字符串提取16进制字符"

    ```asm
    data segment
    sth db 10h dup(0)
    s db 100h dup('S')
    t db 100h dup('T')
    data ends
    code segment
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov bx, 0
    input_next:
       mov ah, 1
       int 21h; AL=getchar()
       cmp al, 0Dh; 判断是否为回车键
       je input_done
       mov s[bx], al
       add bx, 1                     
       jmp input_next
    input_done:
       mov s[bx], 0
    ;#1_begin------------------------
        mov bx,0
        mov si,0
    do:
        mov al,s[bx]
        cmp al,0
        je do_end
        cmp al,'a'
        jge lower
            cmp al,'A'
            jge upper
            digit:
                cmp al,'0'
                jge ok1_digit
                    jmp not_lower_end
                ok1_digit:
                cmp al,'9'
                jle ok2_digit
                    jmp not_lower_end
                ok2_digit:
                    mov t[si],al
                    add si,1
                jmp not_lower_end
            upper:
                cmp al,'F'
                jle ok_upper
                    jmp upper_end
                ok_upper:
                    mov t[si],al
                    add si,1
                upper_end:
            not_lower_end:
            jmp check_end
        lower:
            cmp al,'f'
            jle ok_lower
                jmp lower_end
            ok_lower:
                sub al,32
                mov t[si],al
                add si,1
            lower_end:
        check_end:
        add bx,1
        jmp do
    do_end:
        mov t[si],0;<--第1空, 请把解答写在分号左边, 可填多条指令
    ;#1_end==========================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ```

??? note "7 写显卡内存输出ASCII字符及其16进制ASCII码"
    ```asm
    ;本题要求:
    ;以下程序的功能是从键盘输入一个十六进制数，
    ;该十六进制数一共2位，其中十位保存到buf[0]
    ;中，个位保存到buf[1]中，无论十位还是个位
    ;只要输入的是字母则一定是大写形式。接下去
    ;按以下步骤从屏幕第0行起输出16行内容，每行
    ;都输出字符c+i(i为屏幕行号)及其16进制ASCII码:
    ;(1)把buf[0]及buf[1]中的十六进制字符脱去引号
    ;(2)计算buf[0]<<4 | buf[1]的值并保存到变量c中
    ;(3)i=0
    ;(4)在(0,i)处显示字符c, 颜色为7Ch
    ;(5)在(1,i)处显示字符c的2位十六进制ASCII码, 颜色为1Ah
    ;(6)c++
    ;(7)i++
    ;(8)if(i<16) goto (4)
    ;(9)结束程序运行

    .386
    data segment use16
    buf db 0, 0
    c   db 0
    hex db 0, 0
    data ends
    
    code segment use16
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov ax, 0B800h
       mov es, ax
       mov di, 0
       ;
       mov ah, 1
       int 21h
       mov buf[0], al
       mov ah, 1
       int 21h
       mov buf[1], al
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;(1)把buf[0]及buf[1]中的十六进制字符脱去引号
    ;(2)计算buf[0]<<4 | buf[1]的值并保存到变量c中
    ;(3)i=0
    ;(4)在(0,i)处显示字符c, 颜色为7Ch
    ;(5)在(1,i)处显示字符c的2位十六进制ASCII码, 颜色为1Ah
    ;(6)c++
    ;(7)i++
    ;(8)if(i<16) goto (4)
    ;(9)结束程序运行
    ;#1_begin-------------------------------------
    
        mov al,buf[0]
        call remove_quotation_mark
        mov buf[0],al
    
        mov al,buf[1]
        call remove_quotation_mark
        mov buf[1],al
    
        mov al,buf[0]
        shl al,4
        or al,buf[1]
        mov c,al
    
        mov bx,0
    do:
        cmp bx,16
        jge done
    
        mov al,c
        mov es:[di],al
        mov byte ptr es:[di+1],7Ch
    
        mov hex[0],al
        shr hex[0],4
    
        mov hex[1],al
        and hex[1],0Fh
    
        mov al,hex[0]
        call add_quotation_mark
        mov hex[0],al
        mov es:[di+2],al
    
        mov al,hex[1]
        call add_quotation_mark
        mov hex[1],al
        mov es:[di+4],al


        mov byte ptr es:[di+3],1Ah
        mov byte ptr es:[di+5],1Ah
    
        add di,160
        add bx,1
        add c,1
        jmp do
    
    remove_quotation_mark:
        cmp al,'0'
        jge geq_0
            sub al,'A'
            add al,10
            jmp done1
        geq_0:
            cmp al,'9'
            jle leq_9
                sub al,'A'
                add al,10
                jmp done2
            leq_9:
                sub al,'0'
            done2:
        done1:
        ret
    
    add_quotation_mark:
        cmp al,0
        jge geq_0_
            add al,'A'
            sub al,10
            jmp done3
        geq_0_:
            cmp al,9
            jle leq_9_
                add al,'A'
                sub al,10
                jmp done4
            leq_9_:
                add al,'0'
            done4:
        done3:
        ret
    
    done:
    ;#1_end=======================================
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ```

??? note "10 调用函数f(n)求 1+2+3+...+n 之和并保存到变量sum中"
	
	注意要用空格不能用 Tab。白老师在书本题目集的 judge 程序里面没有对 Tab 做处理。
	
	```asm
	;本题要求:
    ;完成3项程序填空,调用函数f()求1+2+3+...+n之和并保存到变量sum中,
    ;注意sum不会超过0FFFFh,故在计算过程中不需要考虑加法溢出
    ;==========请把在完成填空后把本文件保存到src\main.asm==================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    .386
    data segment use16
    sth db 10h dup(0)
    n dw 3
    sum dw 0
    data ends

    code segment use16
    assume cs:code, ds:data
    ;函数f()原型:
    ;   short int f(short int n, short int *psum);
    ;函数f()功能:
    ;   计算1+2+3+...n的和, 并把和保存到*psum中。例如当n=3时, *psum=6。
    ;提示:
    ;   f()的参数通过堆栈传递, 其中n就是[bp+4], psum就是[bp+6]。
    ;注意:
    ;   在函数f()中不可直接引用data段中的变量n及sum, 否则会编译失败
    f proc near
       push bp
       mov bp, sp
       mov bx, 0
       mov cx, 0
    ;#1_begin--------
       mov cx,[bp+4] ; <--第1空, 请把解答写在分号左边, 本行上方切勿插入空行
    ;#1_end----------
       mov bx, [bp+6]
       xor ax, ax
    next:
       add ax, cx
       loop next
    ;#2_begin------
       mov [bx],ax ; <--第2空, 请把解答写在分号左边, 本行上方切勿插入空行
    ;#2_end--------
       pop bp
       ret
    f endp

    main:
       mov ax, data
       mov ds, ax
       mov ax, offset sum; ax = sum的偏移地址
    ;#3_begin------------
       push ax ; <--第3空, 请把解答写在分号左边, 本行上方切勿插入空行
    ;#3_end--------------
       push [n]     ; 传递n的值给函数f()
       call f
       add sp, 4    ; 清除堆栈上的2个参数
       mov ax, [sum]; 跟踪时请检查当n=3时,ax应该等于6
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请在完成填空后把本文件保存到src\main.asm================
    ```


??? note "11 输入一个十六进制字符串,转化成整数,统计该整数二进制位值=1的位数"

    ```asm
    ;本题要求:
    comment %
    以下程序的功能是从键盘输入一个大写十六进制字符串并保存到数组buf中，
    该字符串的长度≤4，再把buf中的十六进制串转化成整数并保存到变量abc中，
    最后以十进制格式输出abc的二进制位值=1的位数。
    %
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    .386
    data segment use16
    buf db 10 dup(0) ; buf用来存放输入的十六进制字符
    abc dw 0         ; abc用来存放由buf中的十六进制字符串转化得来的整数值
    data ends
    
    code segment use16
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov cx, 4      ; 最多输入4个十六进制字符
       mov si, 0      ; si是buf的下标
    input_next:   
       mov ah, 1
       int 21h        ; AL=getchar()
       cmp al, 0Dh    ; 若AL==回车符
       je input_done  ;    =>input_done
       mov buf[si], al; buf[si] = AL
       add si, 1      ; si++
       sub cx, 1
       jnz input_next
    input_done: 
       mov buf[si], 0 ; buf[si] = '\0'
       mov ah, 2
       mov dl, 0Dh
       int 21h        ; 输出回车符
       mov ah, 2
       mov dl, 0Ah
       int 21h        ; 输出换行符
       ;   
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;把buf中的十六进制串转化成整数并保存到变量abc中，
    ;再以十进制格式输出abc的二进制位值=1的位数
    ;#1_begin-------------------------------------
        mov si,0
        mov bx,0
        mov ax,0
    do:
        cmp buf[si],0
        je done
    
        mov al,buf[si]
    
        cmp buf[si],'9'
        jle digit
            sub al,'A'
            add al,10
            jmp done0
        digit:
            sub al,'0'
        done0:
    
        shl abc,4
        or abc,ax
    
        add si,1
        jmp do
    done:
        mov ax,0
    do2:
        cmp abc,0
        je done2
    
        mov bx,abc
        and bx,1
        cmp bx,1
        je count1
            jmp done3
        count1:
            add ax,1
        done3:
    
        shr abc,1
        jmp do2
    done2:
    
    cmp ax,0
    je print0
    
        mov bx,0
        mov dx,0
        mov cl,10
    do3:
        cmp ax,0
        je done4
    
        div cl
    
        mov dl,ah
        push dx
        mov ah,0
    
        add bx,1
        jmp do3
    done4:
    
    print:
        cmp bx,0
        je exit
    
        mov ah,2
        pop dx
        add dx,'0'
        int 21h
    
        sub bx,1
        jmp print
    
    print0:
        mov ah,2
        mov dl,'0'
        int 21h
    ;#1_end========================================
    exit:
       mov ah, 2
       mov dl, 0Dh
       int 21h
       mov ah, 2
       mov dl, 0Ah
       int 21h
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "13 输出九九乘法表"

    ```asm
    ;本题要求:
    comment %
    以下程序的功能是输出九九乘法表
    %
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    data segment
    s  db "1*1= 1  ", '$'  ; s[0]=被乘数+'0', s[2]=乘数+'0'，s[4]=乘积的十位+'0' 
                           ; （若乘积为个位数则s[4]=' '），s[5]=乘积的个位+'0'
                           ; 一个乘法算式总共包含8个字符，故文本模式下每行（80列）
                           ; 足够输出9个算式
    cr db 0Dh, 0Ah, '$'    ; 定义一个由回车及换行构成的字符串
    data ends
    
    code segment
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
    ;请在#1_begin和#1_end之间补充代码输出九九乘法表
    ;#1_begin-------------------------------------
    outer:
        mov al,s[0]
        mov s[2],al
        inner:
            mov al,s[0]
            sub al,'0'
            mov bl,s[2]
            sub bl,'0'
            mul bl
            mov dl,10
            div dl
            cmp al,0
            je equal0
                mov s[4],al
                add s[4],'0'
                jmp done
            equal0:
                mov s[4],' '
            done:
            mov s[5],ah
            add s[5],'0'
    
            mov ah,9
            mov dx,offset s
            int 21h
    
            add s[2],1
            cmp s[2],'9'
            jbe inner
    
        mov ah,9
        mov dx,offset cr
        int 21h
    
        add s[0],1
        cmp s[0],'9'
        jbe outer
    ;#1_end========================================
    exit:                
       mov ah, 4Ch
       int 21h             ; 结束程序运行
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "14 把二进制字符串转化成整数"

    ```asm
    ;本题要求:
    comment %
    以下程序的功能是从键盘输入一个长度不超过16个字符的二进制字符串，
    再把该字符串转化成整数并保存到变量abc中
    %
    ;==========请把以下代码保存到src\main.asm==============================
    ;==========选中main.sh及src文件夹->右键->压缩成submit.zip提交==========
    .386
    data segment use16
    buf db 17 dup(0) ; buf用来存放输入的二进制字符串
    abc dw 0         ; abc用来存放由buf中的二进制字符串转化得来的整数值
    data ends
    
    code segment use16
    assume cs:code, ds:data
    main:
       mov ax, data
       mov ds, ax
       mov cx, 16     ; 最多输入16个二进制字符
       mov si, 0      ; si是buf的下标
    input_next:   
       mov ah, 1
       int 21h        ; AL=getchar()
       cmp al, 0Dh    ; 若AL==回车符
       je input_done  ;    =>input_done
       mov buf[si], al; buf[si] = AL
       add si, 1      ; si++
       sub cx, 1
       jnz input_next
    input_done: 
       mov buf[si], 0 ; buf[si] = '\0'
       mov ah, 2
       mov dl, 0Dh
       int 21h        ; 输出回车符
       mov ah, 2
       mov dl, 0Ah
       int 21h        ; 输出换行符
       ;   
    ;请在#1_begin和#1_end之间补充代码实现以下功能:
    ;把buf中的二进制串转化成整数并保存到变量abc中
    ;#1_begin-------------------------------------
        mov si,0
        mov ax,0
    do:
        mov al,buf[si]
        cmp al,0
        je exit
        shl abc,1
        add abc,ax
        sub abc,'0'
        add si,1
        jmp do
    ;#1_end========================================
    exit:
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ;==========请把以上代码保存到src\main.asm==============================
    ```

??? note "21 扫雷"
	```asm
	.386
    data segment use16
    W            equ 8
    WALL         equ 0B2h
    MINE         equ 0Fh
    SPACE        equ 20h
    BLUE         equ 09h
    GREEN        equ 0Ah
    RED          equ 0Ch
    PURPLE       equ 05h
    PINK         equ 0Dh
    BROWN        equ 06h
    YELLOW       equ 0Eh
    CYAN         equ 03h
    WHITE        equ 07h
    ;
    ;-------以下定义在judge时会改变---------
    b label byte
    db  0,  0,  0,  0,  0,  0,  1,  1
    db  2,  2,  1,  0,  0,  0,  1, -1
    db -1, -1,  2,  1,  1,  0,  1,  1
    db -1,  4,  3, -1,  1,  0,  0,  0
    db  2, -1,  2,  2,  2,  1,  0,  0
    db  1,  1,  1,  2, -1,  2,  1,  1
    db  0,  1,  1,  3, -1,  2,  1, -1
    db  0,  1, -1,  2,  1,  1,  1,  1
    row dw 3
    col dw 5
    ;=======以上定义在judge时会改变=========
    ;
    mark   db 8*8 dup(0)
    dcolor db WHITE, BLUE, GREEN, RED, PURPLE, PINK, BROWN, YELLOW, CYAN
    ;
    data ends

    code segment use16
    assume cs:code, ds:data
    ;把二维数组下标转化为一维数组下标
    ;int __stdcall index(int y, int x)
    ;input:
    ;   y = word ptr [bp+4]
    ;   x = word ptr [bp+6]
    ;output:
    ;   di = y*W+x
    index proc
       push bp
       mov bp, sp
       mov ax, [bp+4]
       mov cx, W
       mul cx
       add ax, [bp+6]
       mov di, ax
       pop bp
       ret 4
    index endp


    ;在坐标(x,y)处画一个颜色为color的字符shape
    ;void __cdecl draw_char(int x, int y, unsigned char shape, unsigned char color)
    ;input:
    ;   x = [bp+4]
    ;   y = [bp+6]
    ;   shape = [bp+8]
    ;   color = [bp+0Ah]
    ;output:
    ;   draw shape with color at (x,y)
    draw_char:
       push bp
       mov bp, sp
       push di
       mov ax, [bp+6]
       mov cx, 80
       mul cx
       add ax, [bp+4]
       shl ax, 1
       mov di, ax
       mov al, [bp+8]
       mov ah, [bp+0Ah]
       mov es:[di], ax
       pop di
       pop bp
       ret
    
    ;画扫雷结果
    ;void show_block(void)
    show_block:
    ;#1_begin------------------------------
    
        push ax
        push bx
        mov ax,0
        for_r:
            mov bx,0
            for_c:
                push ax
                push bx
                push bx
                push ax
                call index
                pop bx
                pop ax
                cmp mark[di],0
                je mrc_eq_0
                    cmp b[di],-1
                    je brc_eq_n1
                        mov ch,0
                        mov cl,b[di]
                        mov si,cx
                        mov ch,0
                        mov cl,dcolor[si]
                        push cx
                        mov ch,0
                        mov cl,b[di]
                        add cx,'0'
                        push cx
                        jmp done
                    brc_eq_n1:
                        mov cx,RED
                        shl cx,4
                        or cx,WHITE
                        push cx
                        push MINE
                    jmp done
                mrc_eq_0:
                    push WHITE
                    push WALL
                done:
                push ax
                push bx
                call draw_char
                pop bx
                pop ax
                add sp,4
                add bx,1
                cmp bx,8
                jl for_c
            add ax,1
            cmp ax,8
            jl for_r
        pop bx
        pop ax
        ret	; <--第1空, 请把解答写在分号左边, 可填多条指令
    ;#1_end================================



    ;从第r行第c列起，用深度优先算法递归扫雷
    ;void dig(int r, int c)
    ;input:
    ;  r = [bp+4]
    ;  c = [bp+6]
    ;output:
    ;  ①以r行c列为中心点
    ;  ②若该中心点的值>0则揭开这一格并返回
    ;  ③若该中心点的值=0，则先揭开该中心点，再对围绕该点的8个格进行遍历
    ;  ④设P是8格中的任意一格，把P设为中心点，转②
    ;locals:
    ;  i = [bp-4]
    ;  j = [bp-2]
    i  equ word ptr [bp-4]
    j  equ word ptr [bp-2]
    dig:
    ;#2_begin------------------------------
        push bp
        mov bp,sp
        sub sp,4
        cmp word ptr [bp+4],0
        jl done_
        cmp word ptr [bp+4],7
        jg done_
        cmp word ptr [bp+6],0
        jl done_
        cmp word ptr [bp+6],7
        jg done_
    
        push [bp+6]
        push [bp+4]
        call index
    
        cmp mark[di],1
        je done_
    
        mov mark[di],1
        cmp b[di],-1
        je done_
        cmp b[di],0
        jg done_
    
        mov i,-1
        for_i:
            mov j,-1
            for_j:
                mov ax,[bp+6]
                add ax,j
                push ax
                mov ax,[bp+4]
                add ax,i
                push ax
                call dig
                add sp,4
    
                add j,1
                cmp j,1
                jle for_j
            add i,1
            cmp i,1
            jle for_i
    done_:
        mov sp,bp
        pop bp
        ret        ; <--第2空, 请把解答写在分号左边, 可填多条指令
    
    ;#2_end================================
    
    main:
       mov ax, data
       mov ds, ax
       mov ax, 0B800h
       mov es, ax
       cld
       ;
       mov ax, 0003h
       int 10h
       ;
       push [col]
       push [row]
       call dig
       add sp, 4
       ;
       call show_block
       ;
       mov ah, 4Ch
       int 21h
    code ends
    end main
    ```

## 作业

??? note "第一次作业 10.1"

    ??? note "1 AX为正时计算2*AX否则计算AX的平方"
    
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
    
    ??? note "2 判断素数"
    
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

??? note "第二次作业 10.23"

    ??? note "1 输入一个大写英文字母，输出该字母至'Z'的所有字母"
    
        ```asm
        ;本题要求:
        comment %
        以下程序的功能是从键盘输入一个大写英文字母c，
        再输出c至′Z′的所有字母
        例如：输入X，则应该输出XYZ
        ;请把以下代码补充完整
        %
        code segment
        assume cs:code
        main:
        ;请在#1_begin和#1_end之间补充代码实现以下功能:
        ;从键盘输入一个大写英文字母c，再输出c至′Z′的所有字母
        ;#1_begin-------------------------------------
            mov ah,1
            int 21h
        again:
            mov ah,2
            mov dl,al
            int 21h
    
            add al,1
    
            cmp al,'Z'
            jle again
        ;#1_end=======================================
        exit:
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```
    
    ??? note "2 输入一个正奇数n输出由n行星号构成的菱形"
    
        ```asm
        code segment
        assume cs:code
        output_cr:    ; 用标号来命名一个函数
           mov ah, 2
           mov dl, 0Dh; 回车符的ASCII码
           int 21h    ; putchar('\r');
           mov ah, 2
           mov dl, 0Ah; 换行符的ASCII码
           int 21h    ; putchar('\n');
           ret        ; 函数返回
    
        output_space: ; 输出bp个空格
           push bp
        output_space_next:
           cmp bp, 0
           je output_space_done
           mov ah, 2
           mov dl, ' '
           int 21h
           sub bp, 1
           jmp output_space_next
        output_space_done:
           pop bp
           ret
    
        output_star: ; 输出bp个*
           push bp
        output_star_next:   
           mov ah, 2
           mov dl, '*'
           int 21h
           sub bp, 1
           jnz output_star_next
           pop bp
           ret
    
        main:
           mov ah, 1   ; 调用DOS的1号功能输入一个字符
           int 21h     ; AL=输入的字符
                       ; 假设输入的字符是{'1', '3', '5', '7', '9'}内的其中之一
           mov ah, 0   ; 把AX的高8位清零
           sub al, '0' ; 脱引号, 比如'5' -> 5
           mov bx, ax  ; bx=行数
           call output_cr
           ;#1_begin-------------------
            mov ax,bx	;!!! call output_cr 的时候 mov ah,2 使得 ax 被改了
            shr ax,1
            mov si,0
            sub si,ax
            mov di,ax ;<--第1空, 请把解答写在分号左边, 可填多条指令
                                      ;第1空须完成以下计算:
                                      ;①ax=行数/2; ②si=-(行数/2); ③di=行数/2



           ;#1_end=====================
        next_row:   
           mov bp, si
           ;#2_begin-------------------
            cmp bp,0
            jl upd
                jmp done
            upd:
                mov bp,0
                sub bp,si
            done:                    ;<--第2空, 请把解答写在分号左边, 可填多条指令
                                      ;第2空须完成以下计算:                        
                                      ;bp=待输出的空格数=abs(si)


           ;#2_end=====================
        bp_is_positive:
           call output_space
           ;#3_begin-------------------  
            mov bp,0
            cmp si,0
            jl upd2
                sub bp,si
                jmp done2
            upd2:
                add bp,si
            done2:
                shl bp,1
                add bp,bx            ;<--第3空, 请把解答写在分号左边, 可填多条指令
                                      ;第3空须完成以下计算:                        
                                      ;bp=待输出的*个数=bx - 2*abs(si)
    
           ;#3_end=====================
           call output_star
           call output_cr
           add si, 1
           cmp si, di
           jle next_row
        exit:   
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```

??? note "第三次作业 11.6"

 	??? note "1 用两头对称交换法倒置一个字符串"
 	
 	    ```asm
 	    .386
 	    data segment use16
 	    s db 10 dup(' '), 0
 	    data ends
 	
 	    code segment use16
 	    assume cs:code, ds:data
 	    main:
 	       mov ax, seg s      ; seg s表示s的段地址
 	       mov ds, ax         ; ds=数组s的段地址
 	       mov si, offset s   ; offset s表示s的偏移地址
 	       mov ebx, 7FFFFFFFh ; ebx=待转化的32位数，其值在评测时会改变
 	       mov ebp, 10        ; ebp = 除数
 	    again:   
 	       mov edx, 0         ; 清除64位被除数(由edx、eax拼接)的高32位
 	       mov eax, ebx       ; eax=64位被除数的低32位
 	       div ebp            ; edx、eax / ebp = eax..edx, 商为eax, 余数为edx
 	       add edx, '0'       ; 把edx中的余数转化成数字字符, 例如7转化成'7'
 	       mov ds:[si], dl    ; 把上条指令运算结果edx中的低8位dl保存到ds:[si]中
 	                          ; 这里不需要保存整个edx, 因为edx的高24位一定等于0
 	       add si, 1
 	       mov ebx, eax       ; 更新被除数
 	       cmp eax, 0         ; 若商≠0则...
 	       jne again          ; ==>again
 	    done:   
 	       mov byte ptr ds:[si], 0 ; 在字符串末尾填入结束标志'\0'
 	       mov di, si
 	       sub di, 1               ; ds:di -> s的末元素
 	       mov si, offset s        ; ds:si -> s的首元素
 	       ;#1_begin------------------
 	    reverse:
 	        cmp si,di
 	        jge done_reverse
 	
 	        mov dl,ds:[si]
 	        mov al,ds:[di]
 	        mov ds:[si],al
 	        mov ds:[di],dl
 	
 	        add si,1
 	        sub di,1
 	
 	        jmp reverse
 	    done_reverse:	;<--第1空, 请把解答写在分号左边, 可填多条指令
 	       ;#1_end====================   
 	    output:
 	       mov si, offset s
 	    output_next:   
 	       mov ah, 2
 	       mov dl, ds:[si]
 	       cmp dl, 0
 	       je exit
 	       int 21h
 	       add si, 1
 	       jmp output_next
 	    exit:  
 	       mov ah, 4Ch
 	       mov al, 0
 	       int 21h
 	    code ends
 	    end main
 	    ```
 	
 	??? note "2 金字塔"
 	
 	    ```asm
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
 	    ;#1_begin-------------------
 	        mov cx,[rows]
 	    print:
 	        mov bx,[spaces_on_this_row]
 	        print_spaces:
 	            cmp bx,0
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
 	        ja print	;<--第1空, 请把解答写在分号左边, 可填多条指令
 	    ;#1_end=====================
 	    exit:
 	       mov ah, 4Ch
 	       int 21h
 	    code ends
 	    end main
 	    ```

??? note "第四次作业 11.11"
	??? note "1 逆序输出一个字符串"

        ```asm
        data segment
        sth db 10h dup(0)
        s db "abc123", 0; 此数组的内容在judge时会发生变化
        data ends
    
        code segment
        assume cs:code, ds:data
        main:
           mov ax, seg s
           mov ds, ax
        ;#1_begin-------------------------
            mov si,offset s
        do:
            mov al,ds:[si]
            cmp al,0
            je done
            push ax
            add si,1
            jmp do
        done:
            mov si,offset s
        do2:
            mov al,ds:[si]
            cmp al,0
            je done2
    
            pop dx
            mov ah,2
            int 21h
    
            add si,1
            jmp do2
        done2:                              ;<--第1空, 请把解答写在分号左边, 可填多条指令
        ;#1_end===========================
        exit:
           mov ah, 4Ch
           mov al, 0
           int 21h
        code ends
        end main
        ```
    
    ??? note "2 输入一行字符串提取16进制字符"
    
        ```asm
        data segment
        sth db 10h dup(0)
        s db 100h dup('S')
        t db 100h dup('T')
        data ends
        code segment
        assume cs:code, ds:data
        main:
           mov ax, data
           mov ds, ax
           mov bx, 0
        input_next:
           mov ah, 1
           int 21h; AL=getchar()
           cmp al, 0Dh; 判断是否为回车键
           je input_done
           mov s[bx], al
           add bx, 1                     
           jmp input_next
        input_done:
           mov s[bx], 0
        ;#1_begin------------------------
            mov bx,0
            mov si,0
        do:
            mov al,s[bx]
            cmp al,0
            je do_end
            cmp al,'a'
            jge lower
                cmp al,'A'
                jge upper
                digit:
                    cmp al,'0'
                    jge ok1_digit
                        jmp not_lower_end
                    ok1_digit:
                    cmp al,'9'
                    jle ok2_digit
                        jmp not_lower_end
                    ok2_digit:
                        mov t[si],al
                        add si,1
                    jmp not_lower_end
                upper:
                    cmp al,'F'
                    jle ok_upper
                        jmp upper_end
                    ok_upper:
                        mov t[si],al
                        add si,1
                    upper_end:
                not_lower_end:
                jmp check_end
            lower:
                cmp al,'f'
                jle ok_lower
                    jmp lower_end
                ok_lower:
                    sub al,32
                    mov t[si],al
                    add si,1
                lower_end:
            check_end:
            add bx,1
            jmp do
        do_end:
            mov t[si],0;<--第1空, 请把解答写在分号左边, 可填多条指令
        ;#1_end==========================
        exit:
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```

??? note "第五次作业 12.6"
    ??? note "1 写显卡内存输出ASCII字符及其16进制ASCII码"
        ```asm
        .386
        data segment use16
        buf db 0, 0
        c   db 0
        hex db 0, 0
        data ends

        code segment use16
        assume cs:code, ds:data
        main:
           mov ax, data
           mov ds, ax
           mov ax, 0B800h
           mov es, ax
           mov di, 0
           ;
           mov ah, 1
           int 21h
           mov buf[0], al
           mov ah, 1
           int 21h
           mov buf[1], al
           push ax
           mov ax, 3
           int 10h  ; 清屏
           pop ax   
        ;#1_begin---------------------
            mov al,buf[0]
            call trans1
            mov buf[0],al
    
            mov al,buf[1]
            call trans1
            mov buf[1],al
    
            mov al,buf[0]
            shl al,4
            or al,buf[1]
            mov c,al
    
            mov bx,0
        do:
            cmp bx,16
            jge done
    
            mov al,c
            mov es:[di],al
            mov byte ptr es:[di+1],7Ch
    
            mov hex[0],al
            shr hex[0],4
    
            mov hex[1],al
            and hex[1],0Fh
    
            mov al,hex[0]
            call trans2
            mov hex[0],al
            mov es:[di+2],al
    
            mov al,hex[1]
            call trans2
            mov hex[1],al
            mov es:[di+4],al


            mov byte ptr es:[di+3],1Ah
            mov byte ptr es:[di+5],1Ah
    
            add di,160
            add bx,1
            add c,1
            jmp do
    
        trans1:
            cmp al,'0'
            jge geq_0
                sub al,'A'
                add al,10
                jmp done1
            geq_0:
                cmp al,'9'
                jle leq_9
                    sub al,'A'
                    add al,10
                    jmp done2
                leq_9:
                    sub al,'0'
                done2:
            done1:
            ret
    
        trans2:
            cmp al,0
            jge geq_0_
                add al,'A'
                sub al,10
                jmp done3
            geq_0_:
                cmp al,9
                jle leq_9_
                    add al,'A'
                    sub al,10
                    jmp done4
                leq_9_:
                    add al,'0'
                done4:
            done3:
            ret                        ; <--第1空, 请把解答写在分号左边, 可填多条指令
        ;#1_end=======================
        done:
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```
    
    ??? note "2 输入一个十进制数及一个十六进制数并求和"
    
        ```asm
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
           mov ax, data
           mov ds, ax
           mov eax, -1
           mov ebx, eax
           mov ecx, eax
           mov edx, eax
           mov esi, eax
           mov edi, eax
           mov ebp, eax
        ;#1_begin--------------------
            mov si,offset d
        read_d:
            mov ah,1
            int 21h
            cmp al,0Dh
            je read_d_done
            mov ds:[si],al
            add si,1
            jmp read_d
        read_d_done:
            mov byte ptr ds:[si],0
            mov si,offset h
        read_h:
            mov ah,1
            int 21h
            cmp al,0Dh
            je read_h_done
            mov ds:[si],al
            add si,1
            jmp read_h
        read_h_done:
            mov byte ptr ds:[si],0
            mov eax,0
            mov ecx,0
            mov si,offset d
        calc_d:
            mov cl,ds:[si]
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
            mov cl,ds:[si]
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
            mov result,eax                            ; <--第1空, 请把解答写在分号左边, 可填多条指令           
        ;#1_end======================
        exit:
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```

??? note "第六次作业 11.18"
	??? note "1 扫雷"
		```asm
		.386
        data segment use16
        W            equ 8
        WALL         equ 0B2h
        MINE         equ 0Fh
        SPACE        equ 20h
        BLUE         equ 09h
        GREEN        equ 0Ah
        RED          equ 0Ch
        PURPLE       equ 05h
        PINK         equ 0Dh
        BROWN        equ 06h
        YELLOW       equ 0Eh
        CYAN         equ 03h
        WHITE        equ 07h
        ;
        ;-------以下定义在judge时会改变---------
        b label byte
        db  0,  0,  0,  0,  0,  0,  1,  1
        db  2,  2,  1,  0,  0,  0,  1, -1
        db -1, -1,  2,  1,  1,  0,  1,  1
        db -1,  4,  3, -1,  1,  0,  0,  0
        db  2, -1,  2,  2,  2,  1,  0,  0
        db  1,  1,  1,  2, -1,  2,  1,  1
        db  0,  1,  1,  3, -1,  2,  1, -1
        db  0,  1, -1,  2,  1,  1,  1,  1
        row dw 3
        col dw 5
        ;=======以上定义在judge时会改变=========
        ;
        mark   db 8*8 dup(0)
        dcolor db WHITE, BLUE, GREEN, RED, PURPLE, PINK, BROWN, YELLOW, CYAN
        ;
        data ends

        code segment use16
        assume cs:code, ds:data
        ;把二维数组下标转化为一维数组下标
        ;int __stdcall index(int y, int x)
        ;input:
        ;   y = word ptr [bp+4]
        ;   x = word ptr [bp+6]
        ;output:
        ;   di = y*W+x
        index proc
           push bp
           mov bp, sp
           mov ax, [bp+4]
           mov cx, W
           mul cx
           add ax, [bp+6]
           mov di, ax
           pop bp
           ret 4
        index endp


        ;在坐标(x,y)处画一个颜色为color的字符shape
        ;void __cdecl draw_char(int x, int y, unsigned char shape, unsigned char color)
        ;input:
        ;   x = [bp+4]
        ;   y = [bp+6]
        ;   shape = [bp+8]
        ;   color = [bp+0Ah]
        ;output:
        ;   draw shape with color at (x,y)
        draw_char:
           push bp
           mov bp, sp
           push di
           mov ax, [bp+6]
           mov cx, 80
           mul cx
           add ax, [bp+4]
           shl ax, 1
           mov di, ax
           mov al, [bp+8]
           mov ah, [bp+0Ah]
           mov es:[di], ax
           pop di
           pop bp
           ret
    
        ;画扫雷结果
        ;void show_block(void)
        show_block:
        ;#1_begin------------------------------
    
            push ax
            push bx
            mov ax,0
            for_r:
                mov bx,0
                for_c:
                    push ax
                    push bx
                    push bx
                    push ax	; 这里 push 顺序反了调了好久。index(y,x) 实际上是 index(ax,bx)……没认真看 index 内部的一集
                    call index
                    pop bx
                    pop ax
                    cmp mark[di],0
                    je mrc_eq_0
                        cmp b[di],-1
                        je brc_eq_n1
                            mov ch,0
                            mov cl,b[di]
                            mov si,cx
                            mov ch,0
                            mov cl,dcolor[si]
                            push cx
                            mov ch,0
                            mov cl,b[di]
                            add cx,'0'
                            push cx
                            jmp done
                        brc_eq_n1:
                            mov cx,RED
                            shl cx,4
                            or cx,WHITE
                            push cx
                            push MINE
                        jmp done
                    mrc_eq_0:
                        push WHITE
                        push WALL
                    done:
                    push ax
                    push bx
                    call draw_char
                    pop bx
                    pop ax
                    add sp,4
                    add bx,1
                    cmp bx,8
                    jl for_c
                add ax,1
                cmp ax,8
                jl for_r
            pop bx
            pop ax
            ret	; <--第1空, 请把解答写在分号左边, 可填多条指令
        ;#1_end================================



        ;从第r行第c列起，用深度优先算法递归扫雷
        ;void dig(int r, int c)
        ;input:
        ;  r = [bp+4]
        ;  c = [bp+6]
        ;output:
        ;  ①以r行c列为中心点
        ;  ②若该中心点的值>0则揭开这一格并返回
        ;  ③若该中心点的值=0，则先揭开该中心点，再对围绕该点的8个格进行遍历
        ;  ④设P是8格中的任意一格，把P设为中心点，转②
        ;locals:
        ;  i = [bp-4]
        ;  j = [bp-2]
        i  equ word ptr [bp-4]
        j  equ word ptr [bp-2]
        dig:
        ;#2_begin------------------------------
            push bp
            mov bp,sp
            sub sp,4
            cmp word ptr [bp+4],0
            jl done_
            cmp word ptr [bp+4],7
            jg done_
            cmp word ptr [bp+6],0
            jl done_
            cmp word ptr [bp+6],7
            jg done_
    
            push [bp+6]
            push [bp+4]
            call index	; 这里 push 顺序反了调了好久。index(y,x) 实际上是 index(r,c)……
    
            cmp mark[di],1
            je done_
    
            mov mark[di],1
            cmp b[di],-1
            je done_
            cmp b[di],0
            jg done_
    
            mov i,-1
            for_i:
                mov j,-1
                for_j:
                    mov ax,[bp+6]
                    add ax,j
                    push ax
                    mov ax,[bp+4]
                    add ax,i
                    push ax
                    call dig
                    add sp,4
    
                    add j,1
                    cmp j,1
                    jle for_j
                add i,1
                cmp i,1
                jle for_i
        done_:
            mov sp,bp
            pop bp
            ret        ; <--第2空, 请把解答写在分号左边, 可填多条指令
    
        ;#2_end================================
    
        main:
           mov ax, data
           mov ds, ax
           mov ax, 0B800h
           mov es, ax
           cld
           ;
           mov ax, 0003h
           int 10h
           ;
           push [col]
           push [row]
           call dig
           add sp, 4
           ;
           call show_block
           ;
           mov ah, 4Ch
           int 21h
        code ends
        end main
        ```