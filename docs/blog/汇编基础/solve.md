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

