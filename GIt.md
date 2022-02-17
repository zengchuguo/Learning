## 分支管理

git checkout -b featuer/k.1.0.0_chuguo

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

## remote

git add .

git commit -m 'init'

! git branch -M main 可不需要

git remote add origin <url>

远程仓库存在 git remote remove <remote-name>

### push

第一次提交 git push -u origin main 

后面提交 git push 



强行和远程仓库关联提交

git push --set-upstream origin url

