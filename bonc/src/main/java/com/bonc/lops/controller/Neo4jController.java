package com.bonc.lops.controller;

import com.bonc.lops.config.DbSelProvider;
import com.bonc.lops.pojo.Neo4jQueryParam;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jooq.tools.json.JSONArray;
import org.neo4j.driver.types.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/neo4j")
public class Neo4jController {

    @Autowired
    private Neo4jClient neo4jClient;

    @Autowired
    private DbSelProvider dbSelProvider;

    private final Logger log = LogManager.getLogger(this.getClass());

    @PostMapping("/query")
    public List<Map<String, Object>> executeQuery(@RequestBody Neo4jQueryParam prm) {
        try {
            String query = prm.getQuery();
            String database = prm.getDatabase();
            log.info("查询参数为:{}-{}", query, database);
            dbSelProvider.setDatabase(database);
            Collection<Map<String, Object>> nodes = neo4jClient.query(query).fetch().all();
            List<Map<String, Object>> res = nodes.parallelStream().map(this::convertNodeToMap).collect(Collectors.toList());
            log.info("返回值为:{}", JSONArray.toJSONString(res));
            return res;
        } catch (Exception e) {
            log.error("neo4j查询异常:", e);
            throw new RuntimeException(e);
        } finally {
            dbSelProvider.clearDatabase();
        }
    }

    public Map<String, Object> convertNodeToMap(Map<String, Object> node) {
        Map<String, Object> res = new HashMap<>();
        for (Map.Entry<String, Object> obj : node.entrySet()) {
            Object value = obj.getValue();
            if (value instanceof Node) {
                Node tmp = (Node) value;
                Map<String, Object> nodeMap = new HashMap<>();
                // 设置节点的属性（properties）
                Map<String, Object> properties = new HashMap<>();
                tmp.keys().forEach(key -> properties.put(key, tmp.get(key).asObject()));
                nodeMap.put("properties", properties);
                // 获取节点的标签（labels），可以选择是否需要将标签作为属性放入 Map 中
                tmp.labels().forEach(label -> nodeMap.put("labels", label));
                // 可选：将节点的ID作为属性放入 Map 中
                nodeMap.put("id", tmp.id());
                res.putAll(nodeMap);
            } else {
                res.put(obj.getKey(), obj.getValue());
            }
        }
        return res;
    }
}
