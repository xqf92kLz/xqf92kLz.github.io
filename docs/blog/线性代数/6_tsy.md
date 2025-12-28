## 知识点

### 二次型的定义及标准形

- 定义 1：一个系数取自数域 $\mathbb P$，含有 $n$ 个变量 $x_1,x_2,\cdots,x_n$ 的二次齐次多项式 $f(x_1,x_2,\cdots,x_n)=\sum_{i=1}^n\sum_{j=1}^n a_{ij}x_ix_j=(x_1,\cdots,x_n)\begin{pmatrix}a_{11}&\cdots&a_{1n}\\\vdots&\ddots&\vdots\\a_{n1}&\cdots&a_{nn}\end{pmatrix}\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}=\boldsymbol X^T\boldsymbol A\boldsymbol X$

	称为数域 $\mathbb P$ 上的一个二次型。

	若 $\mathbb P=\mathbb R$，称为实二次型；若 $\mathbb P=\mathbb C$，称为复二次型。

- 定义 2：只含二次平方项的二次型称为标准形。形如 $f(x_1,x_2,\cdots,x_n)=d_1y_1^2+d_2y_2^2+\cdots+d_ny_n^2\,(d_1,d_2,\cdots,d_n\in\mathbb P)$。

- 定义 3（线性替换）：设有两组变量 $(\text I)\,x_1,\cdots,x_n$，$(\text{II})\,y_1,\cdots,y_n$，则系数 $c_{ij}\in\mathbb P$ 中的一组关系 $\begin{cases}x_1=c_{11}y_1+\cdots+c_{1n}y_n\\\vdots\\x_n=c_{n1}y_1+\cdots+c_{nn}y_n\end{cases}$，即 $\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}=\begin{pmatrix}c_{11}&\cdots&c_{1n}\\\vdots&\ddots&\vdots\\c_{n1}&\cdots&c_{nn}\end{pmatrix}\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}$，称为从变量 $(\text I)$ 到 $(\text{II})$ 的线性替换。

	记 $\boldsymbol X=(x_1,\cdots,x_n)^T$，$\boldsymbol Y=(y_1,\cdots,y_n)^T$，$\boldsymbol C=(c_{ij})_{n\times n}$，则上述关系可以用矩阵表示为 $\boldsymbol X=\boldsymbol C\boldsymbol Y$。

	若 $\mathbb P=\mathbb R$，称为实线性替换；若 $\mathbb P=\mathbb C$，称为复线性替换。

	若 $|\boldsymbol C|\neq 0$，称为非退化线性替换。

	若 $\boldsymbol C^T\boldsymbol C=\boldsymbol E$，称 $\boldsymbol X=\boldsymbol C\boldsymbol Y$ 为正交线性替换。

- 性质 1：正交线性替换保持向量长度不变。

	??? note "证明"
		设 $\boldsymbol X=\boldsymbol C\boldsymbol Y$，其中 $\boldsymbol C^T\boldsymbol C=\boldsymbol E$，则 $\|\boldsymbol X\|^2=\boldsymbol X^T\boldsymbol X=(\boldsymbol C\boldsymbol Y)^T(\boldsymbol C\boldsymbol Y)=\boldsymbol Y^T(\boldsymbol C^T\boldsymbol C)\boldsymbol Y=\boldsymbol Y^T\boldsymbol Y=\|\boldsymbol Y\|^2$
	
	所以，在正交线性替换的坐标变换下，空间的几何体保持原来的形状完全不变。这是我们后面经常强调用正交线性替换的原因。

- 二次型的两个中心命题：

	① 利用非退化线性替换化二次型为标准形
	
	② 确定二次型的正定性

- 化二次型为标准形

	1. 方法 1：配方法
		
		任一个二次型总是如下两种情况之一：① 含有 $x_i^2$；② 不含有 $x_i^2$
		
		???+ example "例题"
			$f(x_1,x_2,x_3)=x_1^2+2x_1x_2+2x_1x_3+x_2^2-2x_2x_3-x_3^2$
			
			??? note "解答"
				$=(x_1^2+2x_1x_2+2x_1x_3)+x_2^2-2x_2x_3-x_3^2=(x_1+x_2+x_3)^2-4x_2x_3-2x_3^2=(x_1+x_2+x_3)^2-2(x_2+x_3)^2+2x_2^2$
				
				令 $\begin{cases}y_1=x_1+x_2+x_3\\y_2=x_2+x_3\\y_3=x_2\end{cases}$，即有 $\begin{pmatrix}y_1\\y_2\\y_3\end{pmatrix}=\begin{pmatrix}1&1&1\\0&1&1\\0&1&0\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}$，$\boldsymbol Y=\boldsymbol C\boldsymbol X$（因为 $|\boldsymbol C|\neq 0$，所以非退化）
				
				$f(x_1,x_2,x_3)=y_1^2-2y_2^2+2y_3^2$
				
			$f(x_1,x_2,x_3)=2x_1x_2+2x_1x_3-6x_2x_3$
			
			??? note "解答"
				令 $\begin{cases}x_1=y_1+y_2\\x_2=y_1-y_2\\x_3=y_3\end{cases}$，则 $\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\begin{pmatrix}1&1&0\\1&-1&0\\0&0&1\end{pmatrix}\begin{pmatrix}y_1\\y_2\\y_3\end{pmatrix}$，$\boldsymbol X=\boldsymbol C\boldsymbol Y$ 非退化
				
				$f(x_1,x_2,x_3)=2y_1^2-y_2^2-4y_1y_2+8y_2y_3$ 化为第一种情形

- 定理 1：任意一个二次型都可以经过非退化线性替换化成一个标准形。
	
- 定义 4：设 $f(x_1,x_2,\cdots,x_n)=\sum_{i=1}^n\sum_{j=1}^n a_{ij}x_ix_j=\boldsymbol X^T\boldsymbol A\boldsymbol X$，其中 $\boldsymbol X=(x_1,x_2,\cdots,x_n)^T$。

	只有当 $\boldsymbol A=\boldsymbol A^T$ 时，上式成为二次型的矩阵表示，其中对称矩阵 $\boldsymbol A$ 称为二次型矩阵。

	???+ example "例题"
		求二次型矩阵：
		
		$f(x_1,x_2,x_3)=x_1^2+2x_1x_2+2x_1x_3+x_2^2-2x_2x_3-x_3^2$
		
		??? note "解答"
			$=(x_1,x_2,x_3)\begin{pmatrix}1&1&1\\1&1&-1\\1&-1&-1\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\boldsymbol X^T\boldsymbol A\boldsymbol X$
		
		$f(x_1,x_2,x_3)=2x_1x_2+2x_1x_3-6x_2x_3$
		
		??? note "解答"
			$=(x_1,x_2,x_3)\begin{pmatrix}0&1&1\\1&0&-3\\1&-3&0\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\boldsymbol X^T\boldsymbol A\boldsymbol X$
			
			注意 $=(x_1,x_2,x_3)\begin{pmatrix}0&2&5\\0&0&-12\\-3&6&0\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\boldsymbol X^T\boldsymbol B\boldsymbol X$，等号虽成立，但 $\boldsymbol B$ 不是二次型矩阵。
		
		$f(x,y,z,t)=(x-2y+3z-5t)(3x+5y-4z+3t)$
		
		??? note "解答"
			$\begin{aligned}f(x,y,z,t)&=(x,y,z,t)\begin{pmatrix}1\\-2\\3\\-5\end{pmatrix}(3,5,-4,3)\begin{pmatrix}x\\y\\z\\t\end{pmatrix}\\&=(x,y,z,t)\begin{pmatrix}3&5&-4&3\\-6&-10&8&-6\\9&15&-12&9\\-15&25&20&-15\end{pmatrix}\begin{pmatrix}x\\y\\z\\t\end{pmatrix}\\&=(x,y,z,t)\begin{pmatrix}3&-\dfrac 1 2&\dfrac 5 2 &-6\\-\dfrac 1 2 &-10&\dfrac{23}2&\dfrac{19}2\\\dfrac 5 2 &\dfrac{23}2&-12&\dfrac{29}2\\-6&\dfrac{19}2&\dfrac{29}2&-15\end{pmatrix}\begin{pmatrix}x\\y\\z\\t\end{pmatrix}\end{aligned}$

- 性质 1：二次型与一个对称矩阵一一对应。即若 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X=\boldsymbol X^T\boldsymbol B\boldsymbol X$，当 $\boldsymbol A=\boldsymbol A^T$，$\boldsymbol B=\boldsymbol B^T$，在一定有 $\boldsymbol A=\boldsymbol B$。

- 定理 2（用矩阵语言描述定理 1）：$\forall \boldsymbol A=\boldsymbol A^T\in\mathbb P^{n\times n}$，一定存在可逆矩阵 $\boldsymbol C\in\mathbb P^{n\times n}$ 使得 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\begin{pmatrix}d_1&&\\&\ddots&\\&&d_n\end{pmatrix}=\text{diag}(d_1,\cdots,d_n)$ 为对角阵。

	??? note "证明"
		设 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$
		
		由定理 1，一定可以找到 $|\boldsymbol C|\neq 0$ 使得 $\boldsymbol X=\boldsymbol C\boldsymbol Y$ 且 $\boldsymbol Y$ 为标准形。
		
		$\begin{aligned}f(x_1,x_2,\cdots,x_n)&=(\boldsymbol C\boldsymbol Y)^T\boldsymbol A(\boldsymbol C\boldsymbol Y)\\&=\boldsymbol Y^T(\boldsymbol C^T\boldsymbol A\boldsymbol C)\boldsymbol Y\\&=d_1y_1^2+d_2y_2^2+\cdots+d_ny_n^2\\&=(y_1,\cdots,y_n)\begin{pmatrix}d_1&&\\&\ddots&\\&&d_n\end{pmatrix}\begin{pmatrix}y_1\\\vdots\\y_n\end{pmatrix}\\&=\boldsymbol Y^T\begin{pmatrix}d_1&&\\&\ddots&\\&&d_n\end{pmatrix}\boldsymbol Y\end{aligned}$
		
		又因为 $\boldsymbol C^T\boldsymbol A\boldsymbol C$ 是对称矩阵，又性质 1，得到 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\begin{pmatrix}d_1&&\\&\ddots&\\&&d_n\end{pmatrix}$

### 合同

- 定义 5：设 $\boldsymbol A,\boldsymbol B\in\mathbb P^{n\times n}$，若有可逆矩阵 $\boldsymbol C\in\mathbb P^{n\times n}$，使得 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\boldsymbol B$，则称 $\boldsymbol A,\boldsymbol B$ 在数域 $\mathbb P$ 上合同，并记作 $\boldsymbol A\stackrel T\sim \boldsymbol B$。

- 性质 1：合同具有

	- 自反性：$\boldsymbol E^T\boldsymbol A\boldsymbol E=\boldsymbol A$
	- 对称性：$\boldsymbol P^T\boldsymbol A\boldsymbol P=\boldsymbol B\Leftrightarrow \boldsymbol A=(\boldsymbol P^{-1})^T\boldsymbol B\boldsymbol P^{-1}$
	- 传递性：$\boldsymbol P^T\boldsymbol A\boldsymbol P=\boldsymbol B,\boldsymbol Q^T\boldsymbol B\boldsymbol Q=\boldsymbol C\Rightarrow (\boldsymbol Q\boldsymbol P)^T\boldsymbol A(\boldsymbol Q\boldsymbol P)=\boldsymbol C$
	
	所以，矩阵的合同也是一种等价关系，称为矩阵的合同关系。
	
	根据相抵关系，可以将 $\mathbb P^{n\times n}$ 按照合同关系分成若干合同（等价）类，使得 $\mathbb P^{n\times n}$ 中的每一个矩阵在且仅在其中一个类中。

- 性质 2：两个矩阵合同有三个保持

	- 保持秩不变：$r(\boldsymbol B)=r(\boldsymbol P^T\boldsymbol A\boldsymbol P)=r(\boldsymbol A)$
	- 保持对称性不变：$\boldsymbol B^T=(\boldsymbol P^T\boldsymbol A\boldsymbol P)^T=\boldsymbol P^T\boldsymbol A^T\boldsymbol P$，即 $\boldsymbol A=\boldsymbol A^T\Leftrightarrow \boldsymbol B=\boldsymbol B^T$
	- 保持正定性不变

- 定理 3（定理 1，定理 2 用合同语言描述）：$\mathbb P^{n\times n}$ 中任意一个对称矩阵都与某一个对角矩阵合同。特别地，当 $\boldsymbol A$ 为实对称矩阵时，必存在正交矩阵 $\boldsymbol U$ 使得 $\boldsymbol U^T\boldsymbol A\boldsymbol U=\begin{pmatrix}\lambda_1&&\\&\ddots&\\&&\lambda_n\end{pmatrix}=\text{diag}(\lambda_1,\cdots,\lambda_n)$，其中 $\lambda_1,\cdots,\lambda_n$ 为 $\boldsymbol A$ 的全体特征值。

- 定理 4（二次型语言）：任意一个实二次型 $f(x_1,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 必可经正交变换 $\boldsymbol X=\boldsymbol U\boldsymbol Y$ 化为标准形，且标准形平方项前的系数正是 $\boldsymbol A$ 的特征值。即 $f(x_1,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal[\boldsymbol U^T\boldsymbol U=\boldsymbol E]{\boldsymbol X=\boldsymbol U\boldsymbol T}\lambda_1y_1^2+\lambda_2y_2^2+\cdots+\lambda_ny_n^2$。

- 不同的非退化线性替换可以得到不同的标准形，即标准形不唯一；

	只有利用正交变换得到的标准形，平方项前面的系数正好是二次型矩阵的特征值；
	
	虽然标准型不唯一，但是我们又发现在不同的标准形中，不等于零的平方项的项数一样（二次型的秩），平方项中正的项数一样（正惯性指数）。

### 二次型的规范形

- 二次型的秩

	- 定义 5：二次型经过非退化线性变换化成标准形后，系数不为零的平方项的项数称为二次型的秩。
	
	- 定理 5：二次型 $f(x_1,x_2,\cdots,x_n)=\sum_{i=1}^n\sum_{j=1}^n a_{ij}x_ix_j=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的秩等于二次型矩阵 $\boldsymbol A$ 的秩。
	
		??? note "证明"
			设二次型的秩为 $r$，则
			
			$f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal{\boldsymbol X=\boldsymbol C\boldsymbol Y,|\boldsymbol C|\neq 0}\boldsymbol Y^T(\boldsymbol C^T\boldsymbol A\boldsymbol C)\boldsymbol Y=d_1y_1^2+d_2y_2^2+\cdots+d_ry_r^2+0\cdot y_{r+1}^2+\cdots+0\cdot y_n^2\,(d_1d_2\cdots d_r\neq 0)$【$r(\boldsymbol C^T\boldsymbol A\boldsymbol C)=r(\boldsymbol A)$】
		
		定理说明，任何的非退化线性变换化二次型成标准形后，不等于零的平方项一定相等。二次型的秩是非退化线性变换的不变量。

- 复数域上二次型的规范形

	设复数域上二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的秩为 $r$，$f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal{\boldsymbol X=\boldsymbol C\boldsymbol Y,|\boldsymbol C|\neq 0}d_1y_1^2+d_2y_2^2+\cdots+d_ry_r^2+0\cdot y_{r+1}^2+\cdots+0\cdot y_n^2$（其中 $d_i\neq 0$，$d_i\in\mathbb C$）$=(\sqrt{d_1}y_1)^2+(\sqrt{d_2}y_2)^2+\cdots+(\sqrt{d_r}y_r)^2=z_1^2+z_2^2+\cdots+z_r^2$
	
	作非退化线性变换 $\begin{pmatrix}z_1\\z_2\\\vdots\\z_r\\z_{r+1}\\\vdots\\z_n\end{pmatrix}=\begin{pmatrix}\sqrt{d_1}&&&&&&\\&\sqrt{d_2}\\&&\ddots\\&&&\sqrt{d_r}\\&&&&1\\&&&&&\ddots\\&&&&&&1\end{pmatrix}\begin{pmatrix}y_1\\y_2\\\vdots\\y_r\\y_{r+1}\\\vdots\\y_n\end{pmatrix}$
	
	称为二次型在复数域上的规范形

- 定理 6：（二次型语言）任意一个复二次型一定可以经过非退化线性变换化为规范形。规范形是唯一的，由二次型的秩唯一决定。

	（矩阵语言）：设 $\boldsymbol A=\boldsymbol A^T\in\mathbb C^{n\times n}$，且 $r(\boldsymbol A)=r$，则 $\boldsymbol A$ 必与 $\begin{pmatrix}\boldsymbol E_r&\boldsymbol O\\\boldsymbol O&\boldsymbol O_{n-r}\end{pmatrix}_{n\times n}$ 合同，即一定存在可逆矩阵 $\boldsymbol C$ 使得 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\begin{pmatrix}\boldsymbol E_r&\boldsymbol O\\\boldsymbol O&\boldsymbol O_{n-r}\end{pmatrix}_{n\times n}$

- 推论：对称矩阵 $\boldsymbol A,\boldsymbol B$ 在复数域上合同 $\Leftrightarrow$ $r(\boldsymbol A)=r(\boldsymbol B)$。

- 实数域上二次型的规范形

	设实数域上二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的秩为 $r$，$f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal{\boldsymbol X=\boldsymbol C\boldsymbol Y,|\boldsymbol C|\neq 0}d_1y_1^2+\cdots+d_py_p^2-d_{p+1}y_{p+1}^2-\cdots-d_ry_r^2+0\cdots y_{r+1}^2+\cdots+0\cdot y_n^2$（$d_i>0$，$d_i\in\mathbb R$）$=(\sqrt{d_1}y_1)^2+\cdots+(\sqrt{d_p}y_p)^2-(\sqrt{d_{p+1}}y_{p+1})^2-\cdots-(\sqrt{d_r}y_r)^2$

- 定义 6：在实二次型的规范形中，$f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X=z_1^2+\cdots+z_p^2-z_{p+1}^2-\cdots-z_r^2$，正平方项的项数 $p$ 称为二次型的正惯性指数，负平方项的项数 $r-p$ 称为二次型的负惯性指数，$p-(r-p)=2p-r$ 称为二次型的符号差。

	该二次型的正（负）惯性指数，符号差也称为实对称矩阵 $\boldsymbol A$ 的正（负）惯性指数，符号差。

- 定理 7：惯性定律

	（二次型语言）任意一个实二次型一定可以经过非退化线性变换化为规范形，规范形是唯一的，由二次型的秩和正（负）惯性指数决定。
	
	（矩阵语言）$n$ 阶实对称矩阵 $\boldsymbol A$ 与对角矩阵 $\text{diag}(d_1,d_2,\cdots,d_n)$ 合同时，$d_i\,(i=1,2,\cdots,n)$ 中不等于零的个数（即 $r(\boldsymbol A)$，大于零的 $d_i$ 个数（$\boldsymbol A$ 的正惯性指数），小于零的 $d_i$ 个数（$\boldsymbol A$ 的负惯性指数），都是唯一的。
	
	设实对称矩阵 $\boldsymbol A_{n\times n}$ 的秩为 $r$，正惯性指数为 $p$，则一定存在可逆矩阵 $\boldsymbol C\in\mathbb R^{n\times n}$，使得 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\begin{pmatrix}E_r&&\\&-\boldsymbol E_{r-p}\\&&\boldsymbol O_{n-r}\end{pmatrix}$

- 特别地，对实对称矩阵 $\boldsymbol A_{n\times n}$，一定存在正交矩阵 $\boldsymbol U$ 使得 $\boldsymbol U^{-1}\boldsymbol A\boldsymbol U=\boldsymbol U^T\boldsymbol A\boldsymbol U=\text{diag}(\lambda_1,\lambda_2,\cdots,\lambda_n)$（其中 $\lambda_1,\lambda_2,\cdots,\lambda_n$ 为 $\boldsymbol A$ 的全体特征值），所以实对称矩阵 $\boldsymbol A_{n\times n}$ 与对角矩阵 $\text{diag}(\lambda_1,\lambda_2,\cdots,\lambda_n)$，既相似又合同。

	所以实对称矩阵 $\boldsymbol A$ 的秩：即为 $\boldsymbol A$ 的不等于零的特征值个数；
	
	实对称矩阵 $\boldsymbol A$ 的正惯性指数：即为 $\boldsymbol A$ 的大于零的特征值个数；
	
	实对称矩阵 $\boldsymbol A$ 的负惯性指数：即为 $\boldsymbol A$ 的小于零的特征值个数。

- 推论：对称矩阵 $\boldsymbol A,\boldsymbol B$ 在实数域上合同 $\Leftrightarrow$ $r(\boldsymbol A)=r(\boldsymbol B)$，且有相同的正（负）惯性指数。

	???+ example "例题"
		设 $\boldsymbol A=\begin{pmatrix}1\\&-1\\&&-2\end{pmatrix}$，$\boldsymbol B=\begin{pmatrix}1&-1&0\\-1&2&0\\0&0&2\end{pmatrix}$，$\boldsymbol C=\begin{pmatrix}1\\&1&1\\&1&-1\end{pmatrix}$，$\boldsymbol D=\begin{pmatrix}1&-1\\-1&1\\&&2\end{pmatrix}$，求：（1）在复数域上与 $\boldsymbol A$ 合同的矩阵；（2）在实数域上与 $\boldsymbol A$ 合同的矩阵。
		
		??? note "解答"
			- （1）
			
				因为 $r(\boldsymbol A)=3$，$r(\boldsymbol B)=r(\boldsymbol C)=3$，$r(\boldsymbol D)=2$，故在复数域上与 $\boldsymbol A$ 合同的有 $\boldsymbol B,\boldsymbol C$。
			
			- （2）
			
				在实数域上，$r(\boldsymbol A)=3$，正惯性指数为 $2$。
				
				$r(\boldsymbol B)=r(\boldsymbol C)=3$，要求 $\boldsymbol B,\boldsymbol C$ 的正惯性指数。
				
				先考虑 $\boldsymbol B$
				
				- 法 1：求出 $\boldsymbol B$ 的特征值，则正的特征值个数即为 $\boldsymbol B$ 的正惯性指数，$|\lambda\boldsymbol E-\boldsymbol B|=(\lambda-2)(\lambda-\dfrac{3+\sqrt 5}2)(\lambda-\dfrac{3-\sqrt 5}2)$，显然 $\boldsymbol B$ 的 $3$ 个特征值都是正的，故 $\boldsymbol B$ 的正惯性指数为 $3$，$\boldsymbol B$ 与 $\boldsymbol A$ 在实数域上补合同。
				- 法 2：求出以 $\boldsymbol B$ 作为二次型矩阵的二次型 $f$，再利用配方法，化 $f$ 为标准型，就可以求出二次型的正惯性指数。$f(x_1,x_2,x_3)=\boldsymbol X^T\boldsymbol B\boldsymbol X=x_1^2-2x_1x_2+2x_2^2+2x_3^2=(x_1-x_2)^2+x_2^2+2x_3^2$，故 $\boldsymbol B$ 的正惯性指数为 $3$，$\boldsymbol B$ 与 $\boldsymbol A$ 在实数域上不合同。

### 二次型的正定性

- 定义 7：设实数域上二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$，若 $\forall \boldsymbol X=(x_1,x_2,\cdots,x_n)^T\neq \boldsymbol \theta\in\mathbb R^n$，一定有

	- $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X>0$，则称 $f$ 为正定二次型，相应的矩阵 $\boldsymbol A$ 为正定矩阵；
	- $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\geq 0$，则称 $f$ 为半正定二次型，相应的矩阵 $\boldsymbol A$ 称为半正定矩阵；
	- $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X<0$，则称 $f$ 为负定二次型，相应的矩阵 $\boldsymbol A$ 称为负定矩阵；
	- $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\leq 0$，则称 $f$ 为负半定二次型，相应的矩阵 $\boldsymbol A$ 称为半负定矩阵。

- 性质 1：设 $f(x_1,x_2,\cdots,x_n)$ 为（半）正定二次型 $\Leftrightarrow$ $-f(x_1,x_2,\cdots,x_n)$ 为（半）负定二次型
- 定义 8：设 $\boldsymbol A=(a_{ij})_{n\times n}=\begin{pmatrix}\Delta_k&*\\*&*\end{pmatrix}$，则 $\Delta_1=a_{11},\Delta_2=\begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix},\Delta_3=\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix},\cdots,\Delta_n=|\boldsymbol A|$ 分别称为 $\boldsymbol A$ 的 $1$ 阶，$2$ 阶，$3$ 阶，...，$n$ 阶顺序子式。

	$D_k\begin{pmatrix}i_1,i_2,\cdots,i_k\\i_1,i_2,\cdots,i_k\end{pmatrix}$ 称为 $\boldsymbol A$ 的 $k$ 阶主子式。

- 定理 8：设实二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$，则下列命题等价

	① $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 为正定二次型
	
	② $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的正惯性指数等于 $p=r(\boldsymbol A)=n$
	
	③ $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的规范形为 $y_1^2+y_2^2+\cdots+y_n^2$
	
	④ $\boldsymbol A$ 为正定矩阵
	
	⑤ $\boldsymbol A$ 的特征值全部大于 $0$
	
	⑥ 存在可逆的实矩阵 $\boldsymbol B$，使得 $\boldsymbol A=\boldsymbol B^T\boldsymbol B$
	
	⑦ $\boldsymbol A$ 与 $\boldsymbol E$ 合同
	
	⑧ $\boldsymbol A$ 的顺序子式 $\Delta_i$ 全部大于 $0$（$i=1,2,\cdots,n$）
	
	??? note "证明"
		- ① 为正定二次型 $\Rightarrow$ ② 正惯性指数等于 $n$：
		
			设 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal{\boldsymbol X=\boldsymbol C\boldsymbol Y,|\boldsymbol C|\neq 0}d_1y_1^2+d_2y_2^2+\cdots+d_ny_n^2$
			
			反设 $d_1\leq 0$，取 $\boldsymbol Y_1=(1,0,\cdots,0)^T$，则有 $\boldsymbol X_1=\boldsymbol C\boldsymbol Y_1\neq\boldsymbol \theta$，但是 $f(\boldsymbol X_1)=d_1\leq 0$，矛盾。
		
		- ② 正惯性指数等于 $n$ $\Rightarrow$ ⑤ $\boldsymbol A$ 的特征值全部大于 $0$：
		
			设 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X\xlongequal{\boldsymbol X=\boldsymbol U\boldsymbol Y,\boldsymbol U^T\boldsymbol U=\boldsymbol E}\lambda_1 y_1^2+\lambda_2y_2^2+\cdots+\lambda_n y_n^2$
		
		- ⑤ $\boldsymbol A$ 的特征值全部大于 $0$ $\Rightarrow$ ⑥ 存在可逆的实矩阵 $\boldsymbol B$，使得 $\boldsymbol A=\boldsymbol B^T\boldsymbol B$：
			
			$\boldsymbol U^T\boldsymbol A\boldsymbol U\xlongequal{\boldsymbol U^T\boldsymbol U=\boldsymbol E}\begin{pmatrix}\lambda_1\\&\ddots\\&&\lambda_n\end{pmatrix}$，则 $\boldsymbol A=\boldsymbol U\begin{pmatrix}\lambda_1\\&\ddots\\&&\lambda_n\end{pmatrix}\boldsymbol U^T=\boldsymbol U\begin{pmatrix}\sqrt{\lambda_1}\\&\ddots\\&&\sqrt{\lambda_n}\end{pmatrix}^T\begin{pmatrix}\sqrt{\lambda_1}\\&\ddots\\&&\sqrt{\lambda_n}\end{pmatrix}\boldsymbol U^T=(\begin{pmatrix}\sqrt{\lambda_1}\\&\ddots\\&&\sqrt{\lambda_n}\end{pmatrix}\boldsymbol U^T)^T\cdot(\begin{pmatrix}\sqrt{\lambda_1}\\&\ddots\\&&\sqrt{\lambda_n}\end{pmatrix}\boldsymbol U^T)=\boldsymbol B^T\boldsymbol B$
		
		- ⑥ 存在可逆的实矩阵 $\boldsymbol B$ 使得 $\boldsymbol A=\boldsymbol B^T\boldsymbol B$ $\Rightarrow$ ⑦ $\boldsymbol A$ 与 $\boldsymbol E$ 合同：
		
			法 1：$\boldsymbol A=\boldsymbol B^T\boldsymbol B=\boldsymbol B^T\boldsymbol E\boldsymbol B$
			
			法 2：$(\boldsymbol B^{-1})^T\boldsymbol A\boldsymbol B^{-1}=(\boldsymbol B^{-1})^T\boldsymbol B^T\boldsymbol B\boldsymbol B^{-1}=\boldsymbol E$，故 $\boldsymbol A$ 与 $\boldsymbol E$ 合同
			
			法 3：设 $\boldsymbol A\boldsymbol \xi=\lambda\boldsymbol \xi$，则 $\boldsymbol B^T\boldsymbol B\boldsymbol \xi=\lambda\boldsymbol \xi\Rightarrow \boldsymbol \xi^T\boldsymbol B^T\boldsymbol B\boldsymbol \xi=\lambda\boldsymbol B^T\boldsymbol \xi\Rightarrow (\boldsymbol B\boldsymbol \xi)^T(\boldsymbol B\boldsymbol \xi)=\lambda\boldsymbol \xi^T\boldsymbol \xi\Rightarrow\lambda>0$
		
		- ⑥ 存在可逆的实矩阵 $\boldsymbol B$ 使得 $\boldsymbol A=\boldsymbol B^T\boldsymbol B$ $\Rightarrow$ ① 为正定二次型：
		
			$f(x_,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X=\boldsymbol X^T\boldsymbol B^T\boldsymbol B\boldsymbol X=(\boldsymbol B\boldsymbol X)^T(\boldsymbol B\boldsymbol X)$，又 $\boldsymbol B$ 可逆，则 $\forall \boldsymbol X\in\mathbb R^n$ 且 $\boldsymbol X\neq\boldsymbol \theta$，$\boldsymbol B\boldsymbol X\neq \boldsymbol \theta$，则 $f(x_1,x_2,\cdots,x_n)=(\boldsymbol B\boldsymbol X)^T(\boldsymbol B\boldsymbol X)>0$，故 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 为正定二次型
	
- 推论 1：实二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 为负定 $\Leftrightarrow (-1)^k\Delta_k>0\,(k=1,2,\cdots,n)$
- 推论 2：$\boldsymbol A$ 为正定矩阵 $\Leftrightarrow$ 存在正定矩阵 $\boldsymbol B$ 使得 $\boldsymbol A=\boldsymbol B^2$ $\Leftrightarrow$ $\boldsymbol A$ 的所有主子式全大于 $0$
- 推论 3：$\boldsymbol A$ 为正定 $\Rightarrow \boldsymbol A=\boldsymbol A^T$，$\boldsymbol A$ 可逆，$|\boldsymbol A|>0$，$a_{ii}>0$（$\boldsymbol A$ 为正定的必要条件）
- 定理 8：设实二次型 $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$，且 $r(\boldsymbol A)=r<n$，则下列命题等价

	① $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 为半正定二次型
	
	② $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的正惯性指数 $p=r(\boldsymbol A)<n$
	
	③ $f(x_1,x_2,\cdots,x_n)=\boldsymbol X^T\boldsymbol A\boldsymbol X$ 的规范形为 $y_1^2+y_2^2+\cdots+y_r^2$
	
	④ $\boldsymbol A$ 为半正定矩阵
	
	⑤ $\boldsymbol A$ 的特征值全部大于等于 $0$
	
	⑥ 存在 $n$ 阶实矩阵 $\boldsymbol C$ 使得 $\boldsymbol A=\boldsymbol C^T\boldsymbol C$
	
	⑦ $\boldsymbol A$ 与 $\begin{pmatrix}\boldsymbol E_r&\boldsymbol O\\\boldsymbol O&\boldsymbol O\end{pmatrix}$ 合同
	
	⑧ $\boldsymbol A$ 的主子式（不是顺序子式）均非负
	
	???+ example "例题"
		判断二次型是否正定：$f(x,y,z,t)=x^2+2xy+y^2+z^2+t^2$
		
		??? note "解答"
			- 法 1：
			
				配方 $f(x,y,z,t)=(x+y)^2+z^2+t^2=x_1^2+z_1^2+t_1^2$，作非退化线性变换 $\begin{cases}x_1=x+y\\y_1=y\\z_1=z\\y_1=t\end{cases}$
				
				$f$ 的正惯性指数 = 秩 = $3$，故为半正定
			
			- 法 2：
			
				因为 $f(1,-1,0,0)=0$，则不是正定
			
			- 法 3：
			
				$f(x,y,z,t)=(x,y,z,t)\begin{pmatrix}1&1\\1&1\\&&1\\&&&1\end{pmatrix}\begin{pmatrix}x\\y\\z\\t\end{pmatrix}$，则 $\Delta_2=\begin{vmatrix}1&1\\1&1\end{vmatrix}=0$，故不是正定的

- 性质 2：$\boldsymbol A$ 为正定矩阵，则

    ① $k\boldsymbol A$ 为正定矩阵（$k>0$）

    ② $\boldsymbol A^{-1}$ 为正定矩阵

    ③ $\boldsymbol A^*$ 为正定矩阵

    ④ $\boldsymbol A^k$ 为正定矩阵

    ⑤ $\boldsymbol C^T\boldsymbol A\boldsymbol C$ 为正定矩阵（$|\boldsymbol C|\neq 0$）【合同保持正定性】

    ??? note "证明"
    	- ② 因为 $(\boldsymbol A^{-1})^T=(\boldsymbol A^T)^{-1}=\boldsymbol A^{-1}$，则 $\boldsymbol A^{-1}$ 为对称矩阵。又因为 $\boldsymbol A^{-1}$ 的特征值全大于 $0$，则 $\boldsymbol A^{-1}$ 为正定矩阵。
  	

    	- ⑤ 一方面 $(\boldsymbol C^T\boldsymbol A\boldsymbol C)^T=\boldsymbol C^T\boldsymbol A\boldsymbol C$。又因为 $\boldsymbol A=\boldsymbol B^T\boldsymbol B$（$\boldsymbol B$ 可逆），则 $\boldsymbol C^T\boldsymbol A\boldsymbol C=\boldsymbol C^T\boldsymbol B^T\boldsymbol B\boldsymbol C=(\boldsymbol B\boldsymbol C)^T(\boldsymbol B\boldsymbol C)$ 且 $|\boldsymbol B\boldsymbol C|\neq 0$，故 $\boldsymbol C^T\boldsymbol A\boldsymbol C$ 为正定矩阵

- 性质 3：设 $\boldsymbol A,\boldsymbol B$ 为 $n$ 阶正定矩阵，则

	① $\boldsymbol A+\boldsymbol B$ 为正定矩阵
	
	② $\begin{pmatrix}\boldsymbol A&\boldsymbol O\\\boldsymbol O&\boldsymbol B\end{pmatrix}$ 为正定矩阵
	
	??? note "证明"
		- ① 一方面 $(\boldsymbol A+\boldsymbol B)^T=\boldsymbol A+\boldsymbol B$。另一方面，设 $f=\boldsymbol X^T(\boldsymbol A+\boldsymbol B)\boldsymbol X$，则 $\forall \boldsymbol X\neq\boldsymbol \theta$，$f=\boldsymbol X^T\boldsymbol A\boldsymbol X+\boldsymbol X^T\boldsymbol B\boldsymbol X>0$。故 $\boldsymbol A+\boldsymbol B$ 为正定矩阵
		- ②
		
			法 1：记 $\boldsymbol C=\begin{pmatrix}\boldsymbol A&\boldsymbol O\\\boldsymbol O&\boldsymbol B\end{pmatrix}$，显然 $\boldsymbol C^T=\boldsymbol C$。$|\lambda \boldsymbol E_{2n}-\boldsymbol C|=|\lambda \boldsymbol E_n-\boldsymbol A||\lambda\boldsymbol E_n-\boldsymbol B|$，故 $\boldsymbol C$ 的全体特征值大于 $0$。故 $\boldsymbol C=\begin{pmatrix}\boldsymbol A&\boldsymbol O\\\boldsymbol O&\boldsymbol B\end{pmatrix}$ 为正定矩阵
			
			法 2：设 $\boldsymbol A$ 的顺序子式 $\Delta_{A1},\Delta_{A_2},\cdots,\Delta_{An}$，$\boldsymbol B$ 的顺序子式 $\Delta_{B1},\Delta_{B_2},\cdots,\Delta_{Bn}$，$\boldsymbol C$ 的顺序子式 $\Delta_1,\Delta_2,\cdots,\Delta_n,\Delta_{n+1},\cdots,\Delta_{2n}$，则 $\Delta_1=\Delta_{A1},\cdots,\Delta_n=\Delta_{An}$，$\Delta_{n+1}=|\boldsymbol A|\Delta_{B1},\cdots,\Delta_{Bn}=|\boldsymbol A|\Delta_{Bn}$ 全部大于 $0$。故 $\begin{pmatrix}\boldsymbol A\\&\boldsymbol B\end{pmatrix}$ 为正定矩阵
	
	
	