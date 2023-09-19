package com.dmj.dmz.mongodb.schema;

import com.dmj.dmz.type.VertexType;
import lombok.Builder;
import lombok.Data;
import org.apache.spark.sql.Row;

@Data
@Builder
public class Vertex {
    // 해시된 정점 번호, 이름, 이미지 경로, 종류 (작품: 드라마, 영화 / 인물: 배우, 스태프)
    private Long vertexId;
    private String name;
    private String imagePath;
    private String type;

    public static Vertex fromContent(Row row) {
        return Vertex
                .builder()
                .vertexId(rowNoToVertexNo(VertexType.CONTENT, row.getAs("ID")))
                .name(row.getAs("NAME_KR"))
                .imagePath(row.getAs("POSTER_PATH"))
                .type(row.getAs("KIND"))
                .build();
    }

    public static Vertex fromPerson(Row row) {
        return Vertex
                .builder()
                .vertexId(rowNoToVertexNo(VertexType.PERSON, row.getAs("ID")))
                .name(row.getAs("NAME_KR"))
                .imagePath(row.getAs("PROFILE_PATH"))
                .type(row.getAs("AREA"))
                .build();
    }

    public static Long rowNoToVertexNo(VertexType type, Long rowNo) {
        return type.index * 1_000_000_000L + rowNo;
    }
}
