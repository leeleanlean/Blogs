## RESTFull API
DemoController.java
```
package com.example.learn.demo.controller;

import com.example.learn.utils.ResultUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
public class DemoController {
  // Logger
  Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * 输出日志
   * @return
   */
  @GetMapping("/log")
  public ResultUtil log() {
    logger.trace("...trace...");
    logger.debug("...debug...");
    logger.info("...info...");
    logger.warn("...warn...");
    logger.error("...error...");
    return ResultUtil.success().render("打印日志成功");
  }

  /**
   * 查询所有数据
   * @return
   */
  @GetMapping("")
  public ResultUtil searchAll () {
    return ResultUtil.success().render("查询所有数据");
  }

  /**
   * 查询一条数据
   * @param id
   * @return
   */
  @GetMapping("/{id}")
  public ResultUtil searchOne (@PathVariable String id) {
    return ResultUtil.success().render("根据ID查询一条数据");
  }

  /**
   * 新增一条数据
   * @param entity
   * @return
   */
  @PostMapping("")
  public ResultUtil create (@RequestBody String entity) {
    return ResultUtil.success().render("新增一条数据");
  }

  /**
   * 更新一条数据
   * @param id
   * @param entity
   * @return
   */
  @PutMapping("/{id}")
  public ResultUtil update (@PathVariable String id, @RequestBody String entity) {
    return ResultUtil.success().render("根据ID更新一条数据");
  }

  /**
   * 删除一条数据
   * @param id
   * @return
   */
  @DeleteMapping("/{id}")
  public ResultUtil delete (@PathVariable String id) {
    return ResultUtil.success().render("根据ID删除一条数据");
  }
}
```