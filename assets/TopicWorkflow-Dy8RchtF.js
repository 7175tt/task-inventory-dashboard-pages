import { c as createLucideIcon, j as jsxRuntimeExports, i as inferTaskGraphNode, f as fallbackPhase, G as GitBranch, C as CircleCheck, L as LockKeyhole, a as Circle, S as Sparkles, b as Link2, d as Check } from "./index-D4NyPx_1.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Layers = createLucideIcon("Layers", [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
]);
const flowStatusLabel = {
  pending: "待處理",
  in_progress: "進行中",
  waiting: "等待中",
  completed: "已完成",
  archived: "已封存"
};
function topicTaskCounts(tasks, workstream) {
  const topicTasks = tasks.filter((task) => task.workstream === workstream && task.status !== "archived");
  return {
    total: topicTasks.length,
    completed: topicTasks.filter((task) => task.status === "completed").length,
    waiting: topicTasks.filter((task) => task.status === "waiting").length
  };
}
function TopicIndex({
  tasks,
  query,
  onSelectWorkstream
}) {
  const normalizedQuery = query.trim().toLocaleLowerCase("zh-Hant");
  const indexedTasks = tasks.filter((task) => task.status !== "archived").filter((task) => !normalizedQuery || `${task.title} ${task.summary} ${task.nextAction} ${task.workstream}`.toLocaleLowerCase("zh-Hant").includes(normalizedQuery));
  const topics = Array.from(new Set(
    indexedTasks.map((task) => task.workstream)
  )).sort((a, b) => a.localeCompare(b, "zh-Hant"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "topic-index", "aria-label": "工作分類索引", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "主題工作區" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "選擇一個分類查看完整流程" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "流程會保留已完成節點，讓前後脈絡不因狀態篩選而消失。" })
    ] }),
    topics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workflow-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { size: 24 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "沒有符合搜尋條件的工作分類" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "清除搜尋或改用其他關鍵字。" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "topic-index-list", children: topics.map((topic, index) => {
      const counts = topicTaskCounts(indexedTasks, topic);
      const progress = counts.total ? Math.round(counts.completed / counts.total * 100) : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onSelectWorkstream(topic), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "topic-index-number", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "topic-index-copy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: topic }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            counts.total,
            " 項任務 · ",
            counts.completed,
            " 已完成",
            counts.waiting ? ` · ${counts.waiting} 等待中` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "topic-index-progress", "aria-label": `完成度 ${progress}%`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { width: `${progress}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          progress,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
      ] }, topic);
    }) })
  ] });
}
function TopicWorkflow({
  tasks,
  workstream,
  query,
  graph,
  onSelectTask,
  onSelectWorkstream,
  onCompleteTask
}) {
  if (workstream === "全部工作") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TopicIndex, { tasks, query, onSelectWorkstream });
  }
  const normalizedQuery = query.trim().toLocaleLowerCase("zh-Hant");
  const topicTasks = tasks.filter((task) => task.workstream === workstream && task.status !== "archived").filter((task) => !normalizedQuery || `${task.title} ${task.summary} ${task.nextAction}`.toLocaleLowerCase("zh-Hant").includes(normalizedQuery));
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  const groups = /* @__PURE__ */ new Map();
  topicTasks.forEach((task) => {
    const node = graph.nodes[task.id] ?? inferTaskGraphNode(task);
    const phase = node.phase || fallbackPhase.label;
    const group = groups.get(phase) ?? { order: node.phaseOrder ?? fallbackPhase.order, tasks: [] };
    group.order = Math.min(group.order, node.phaseOrder ?? fallbackPhase.order);
    group.tasks.push(task);
    groups.set(phase, group);
  });
  const stages = [...groups.entries()].sort(([, left], [, right]) => left.order - right.order).map(([phase, value]) => ({
    phase,
    order: value.order,
    tasks: value.tasks.sort((a, b) => {
      var _a, _b;
      const left = ((_a = graph.nodes[a.id]) == null ? void 0 : _a.phaseOrder) ?? fallbackPhase.order;
      const right = ((_b = graph.nodes[b.id]) == null ? void 0 : _b.phaseOrder) ?? fallbackPhase.order;
      return left - right || a.introducedAt.localeCompare(b.introducedAt);
    })
  }));
  const completed = topicTasks.filter((task) => task.status === "completed").length;
  const waiting = topicTasks.filter((task) => task.status === "waiting").length;
  const topicTaskIds = new Set(topicTasks.map((task) => task.id));
  const confirmedRelations = graph.relations.filter((relation) => relation.humanConfirmed && (topicTaskIds.has(relation.sourceTaskId) || topicTaskIds.has(relation.targetTaskId))).length;
  const progress = topicTasks.length ? Math.round(completed / topicTasks.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "workflow-workspace", "aria-label": `${workstream}工作流程`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "workflow-overview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "主題工作區" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: workstream }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "依任務階段排列；完成節點會保留，未確認的階段以建議標示。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "全部" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: topicTasks.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "已完成" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: completed })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "等待中" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: waiting })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "關聯已確認" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: confirmedRelations })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workflow-progress", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            progress,
            "%"
          ] }),
          " 完成"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { width: `${progress}%` } }) })
      ] })
    ] }),
    stages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workflow-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { size: 24 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "沒有符合搜尋條件的流程節點" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "清除搜尋或改選其他分類。" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workflow-stages", children: stages.map((stage, stageIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "workflow-stage", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(stageIndex + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: stage.phase }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
            stage.tasks.length,
            " 項任務"
          ] })
        ] }),
        stageIndex < stages.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17, "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "workflow-task-list", children: stage.tasks.map((task) => {
        const node = graph.nodes[task.id] ?? inferTaskGraphNode(task);
        const inbound = graph.relations.filter((relation) => relation.humanConfirmed && relation.type === "blocks" && relation.targetTaskId === task.id);
        const outbound = graph.relations.filter((relation) => relation.humanConfirmed && relation.type === "blocks" && relation.sourceTaskId === task.id);
        const unresolved = inbound.map((relation) => taskById.get(relation.sourceTaskId)).filter((blocker) => Boolean(blocker && blocker.status !== "completed" && blocker.status !== "archived"));
        const relatedCount = graph.relations.filter((relation) => relation.sourceTaskId === task.id || relation.targetTaskId === task.id).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: [
          "workflow-task",
          `status-${task.status}`,
          unresolved.length ? "blocked" : ""
        ].filter(Boolean).join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "workflow-task-open", type: "button", onClick: () => onSelectTask(task.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "workflow-task-state", children: [
              task.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 17 }) : unresolved.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { size: 17 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 17 }),
              flowStatusLabel[task.status]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: task.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: task.nextAction || task.summary || "尚未設定下一步" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "workflow-task-meta", children: [
              !node.humanConfirmed && /* @__PURE__ */ jsxRuntimeExports.jsxs("i", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                "建議階段"
              ] }),
              node.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("i", { children: [
                "#",
                tag
              ] }, tag)),
              unresolved.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("i", { className: "blocked", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { size: 12 }),
                "等待 ",
                unresolved.length
              ] }),
              outbound.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("i", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 12 }),
                "解鎖 ",
                outbound.length
              ] }),
              relatedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("i", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 12 }),
                "關聯 ",
                relatedCount
              ] })
            ] })
          ] }),
          task.status !== "completed" && !unresolved.length && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "workflow-complete", type: "button", onClick: () => onCompleteTask(task), "aria-label": `完成 ${task.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 15 }) })
        ] }, task.id);
      }) })
    ] }, stage.phase)) })
  ] });
}
export {
  TopicWorkflow as default
};
