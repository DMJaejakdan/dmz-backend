package com.dmj.dmz.mongodb.schema;

import com.dmj.dmz.processing.Content;
import com.dmj.dmz.type.EdgeType;
import com.dmj.dmz.type.VertexType;
import lombok.Builder;
import lombok.Data;
import org.apache.spark.sql.Row;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class Edge {
    // 간선 번호, 출발점, 도착점, 종류 (작품-인물, 작품-작품, 인물-인물)
    private Long edgeId;
    private Long from;
    private Long to;
    private String type;
    private Integer weight;

    public static List<Edge> fromContentActor(Row row) {
        // Row 하나로 간선을 2개 생성
        Edge fromActorToContent = Edge
                .builder()
                .edgeId(rowNoToEdgeNo(EdgeType.CONTENT_ACTOR, row.getAs("ID")) - 1)
                .from(Vertex.rowNoToVertexNo(VertexType.PERSON, row.getAs("PERSON_ID")))
                .to(Vertex.rowNoToVertexNo(VertexType.CONTENT, row.getAs("CONTENT_ID")))
                .type(EdgeType.CONTENT_ACTOR.label)
                .weight(0)
                .build();

        Edge fromContentToActor = Edge
                .builder()
                .edgeId(rowNoToEdgeNo(EdgeType.CONTENT_ACTOR, row.getAs("ID")))
                .from(Vertex.rowNoToVertexNo(VertexType.CONTENT, row.getAs("CONTENT_ID")))
                .to(Vertex.rowNoToVertexNo(VertexType.PERSON, row.getAs("PERSON_ID")))
                .type(EdgeType.CONTENT_ACTOR.label)
                .weight(0)
                .build();

        return List.of(fromActorToContent, fromContentToActor);
    }

    public static List<Edge> fromContentCrew(Row row) {
        // Row 하나로 간선을 2개 생성
        Edge fromCrewToContent = Edge
                .builder()
                .edgeId(rowNoToEdgeNo(EdgeType.CONTENT_CREW, row.getAs("ID")) - 1)
                .from(Vertex.rowNoToVertexNo(VertexType.PERSON, row.getAs("PERSON_ID")))
                .to(Vertex.rowNoToVertexNo(VertexType.CONTENT, row.getAs("CONTENT_ID")))
                .type(EdgeType.CONTENT_CREW.label)
                .weight(0)
                .build();

        Edge fromContentToCrew = Edge
                .builder()
                .edgeId(rowNoToEdgeNo(EdgeType.CONTENT_CREW, row.getAs("ID")))
                .from(Vertex.rowNoToVertexNo(VertexType.CONTENT, row.getAs("CONTENT_ID")))
                .to(Vertex.rowNoToVertexNo(VertexType.PERSON, row.getAs("PERSON_ID")))
                .type(EdgeType.CONTENT_CREW.label)
                .weight(0)
                .build();

        return List.of(fromCrewToContent, fromContentToCrew);
    }

    public static Edge fromContentContent(Content from, Content to) {
        return Edge
                .builder()
                .edgeId(rowsNoToEdgeNo(EdgeType.CONTENT_CONTENT, from.getId(), to.getId()))
                .from(Vertex.rowNoToVertexNo(VertexType.CONTENT, from.getId()))
                .to(Vertex.rowNoToVertexNo(VertexType.CONTENT, to.getId()))
                .type(EdgeType.CONTENT_CONTENT.label)
                .weight(calculateWeight(from, to))
                .build();
    }

    // 관계에 따른 고유 번호 + row의 ID를 2배로 늘리기
    public static Long rowNoToEdgeNo(EdgeType type, Long rowNo) {
        return type.index * 1_000_000_000L + rowNo * 2;
    }

    public static Long rowsNoToEdgeNo(EdgeType type, Long rowNo1, Long rowNo2) {
        return type.index * 1_000_000_000_000L + rowNo1 * 100_000L + rowNo2;
    }

    private static int calculateWeight(Content from, Content to) {
        Set<String> genreIntersect = new HashSet<>(from.getGenres());
        genreIntersect.retainAll(to.getGenres());

        Set<String> keywordIntersect = new HashSet<>(from.getKeywords());
        keywordIntersect.retainAll(to.getGenres());

        return genreIntersect.size() + keywordIntersect.size();
    }
}
