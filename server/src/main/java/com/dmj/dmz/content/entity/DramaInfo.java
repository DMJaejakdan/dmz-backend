package com.dmj.dmz.content.entity;

import com.dmj.dmz.data.response.DramaDetailResponse;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DramaInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    private LocalDate endDate;

    private String channel;

    @OneToMany(mappedBy = "dramaInfo")
    private List<Episode> episodeList;

    @Builder
    public DramaInfo(Content content, LocalDate endDate, String channel, List<Episode> episodeList) {
        this.content = content;
        this.endDate = endDate;
        this.channel = channel;
        this.episodeList = episodeList;
    }

    public static DramaInfo toEntity(Content content, DramaDetailResponse dramaDetailResponse) {
        LocalDate localDate = null;
        if (dramaDetailResponse.getLastAirDate() != null) {
            localDate = LocalDate.parse(dramaDetailResponse.getLastAirDate());
        }
        String channel = "";
        if (!dramaDetailResponse.getNetworks().isEmpty()) {
            channel = dramaDetailResponse.getNetworks().get(0).getName();
        }
        return DramaInfo.builder()
                .content(content)
                .endDate(localDate)
                .channel(channel)
                .build();
    }

    @Getter
//    @AllArgsConstructor
    public enum DramaChannel {
        TVN,
        MBC,
        SBS,
        KBS
//        private final String channel;
    }
}

