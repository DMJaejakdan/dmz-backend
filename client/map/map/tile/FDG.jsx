'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
function FDG({ vertices, edges }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (!svgRef.current) return;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 노드와 링크를 준비합니다.
    const nodes = vertices.map(v => ({ id: v.vertexId, name: v.name }));
    const links = edges.map(e => ({
      source: e.from,
      target: e.to,
      value: e.weight,
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id(d => d.id)
          .distance(300)
      )
      .force('charge', d3.forceManyBody())
      .force(
        'center',
        d3.forceCenter((dimensions.width - 300) / 2, dimensions.height / 2)
      )
      .on('tick', ticked);

    const svg = d3.select(svgRef.current);

    const link = svg
      .append('g')
      .attr('stroke', '#101015')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => d.weight);

    const nodeGroup = svg
      .append('g')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 1.5)
      .selectAll('g.nodeGroup')
      .data(nodes)
      .join('g')
      .attr('class', 'nodeGroup')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // 원을 추가
    nodeGroup
      .append('circle')
      .attr('r', 15)
      .attr('fill', d => color(d.id));

    // 텍스트를 추가 (노드의 이름)
    nodeGroup
      .append('text')
      .text(d => d.name) // 'name'은 노드 데이터의 이름 속성입니다.
      .attr('dx', 10)
      .attr('dy', 5)
      .attr('fill', 'black');

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodeGroup.attr('transform', d => `translate(${d.x}, ${d.y})`);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100vw"
      height="100vh"
      viewBox="0 0 100vw 100vh"
    ></svg>
  );
}

export default FDG;
