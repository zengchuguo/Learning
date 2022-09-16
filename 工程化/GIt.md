# GIT基本使用和主要命令

## 分支管理

git checkout -b feature/项目简写.版本_开发者

## commit管理

git commit -a -m "<type>(<scope>): <subject>"

<type>

- `feat`: 新功能
- `fix`: 修复`bug`
- `doc`: 文档改变
- `style`: 代码格式变更
- `refactor`: 某个已有功能重构
- `perf`: 性能优化
- `test`: 增加测试
- `build`: 改变`build`工具，比如`webpack`变成`grunt`
- `revert`: 撤销上一次`commit`
- `ci`: 更改`ci configuration`
- `chore`: 一些不更改`src`或者`test`相关文件的提交

<scope>

commit影响的范围，即简要说明修改会涉及的部分

<Subject>

简要描述本次改动

## remote（远程仓库

git add .

git commit -m 'init'

! git branch -M main 可不需要

git remote add origin <url>

远程仓库存在 git remote remove <remote-name>

## push（提交到远程仓库

（提交到远程仓库 需要处理冲突问题

第一次提交 git push -u origin main 

后面提交 git push 



强行和远程仓库关联提交

git push --set-upstream origin url

## pull 

从远程仓库拉去代码

## stash

适用于：

​	当前开发过程中 突然有新BUG中断当前的开发 （需要将当前修改进行一次缓存

​	或者将当前修改放置到其他分支上

```js
$ git stash /* 当前的修改进行缓存 */
$ git stash save '命名'
$ git stash pop /* 将栈顶弹出上一次的修改 */
```

## merge rebase cherry-pick

适用：

​	三种都是将代码进行合并上的处理 但其中还是有很大区别的

简单来说即使：

​	merge主要合并功能块上的开发

​	release

​	cherry-pick处理BUG上的修复 （能在当前分支上修改的一个版本提交到另一个版本 （提交的办事上一串哈希值 使用`git log`来得到）

### merge 

将两个分支进行合并 并生成一个新的commit进行提交

### rebase

会取出一系列的commit记录 复制他们 然后在目标分支上逐一放下去

### cherry-pick

只提交一个版本上的修改