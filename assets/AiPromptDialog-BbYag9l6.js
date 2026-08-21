import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, e as executionStatusLabel, R as RotateCcw, L as LockKeyhole, P as Play, d as Check } from "./index-D4NyPx_1.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ClipboardCopy = createLucideIcon("ClipboardCopy", [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
function listFromText(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}
function AiPromptDialog({
  task,
  plan,
  onClose,
  onSave,
  onApprove,
  onAccept,
  onRevoke,
  queueAvailable
}) {
  var _a;
  const [promptDraft, setPromptDraft] = reactExports.useState(plan.promptDraft);
  const [expectedOutput, setExpectedOutput] = reactExports.useState(plan.expectedOutput);
  const [scope, setScope] = reactExports.useState(plan.scope);
  const [allowed, setAllowed] = reactExports.useState(plan.allowedOperations.join("\n"));
  const [forbidden, setForbidden] = reactExports.useState(plan.forbiddenOperations.join("\n"));
  const [busy, setBusy] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    setPromptDraft(plan.promptDraft);
    setExpectedOutput(plan.expectedOutput);
    setScope(plan.scope);
    setAllowed(plan.allowedOperations.join("\n"));
    setForbidden(plan.forbiddenOperations.join("\n"));
  }, [plan]);
  const patch = () => ({
    promptDraft,
    expectedOutput,
    scope,
    allowedOperations: listFromText(allowed),
    forbiddenOperations: listFromText(forbidden)
  });
  async function run(action, success) {
    setBusy(true);
    setMessage("");
    try {
      await action();
      setMessage(success);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "操作失敗");
    } finally {
      setBusy(false);
    }
  }
  async function copyApprovedPrompt() {
    await navigator.clipboard.writeText(plan.approvedPrompt || promptDraft);
    setMessage("已複製完整 Prompt");
  }
  const locked = plan.status === "approved" || plan.status === "running" || plan.status === "completed" || plan.status === "accepted";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-backdrop prompt-modal-backdrop", onMouseDown: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "prompt-dialog", "aria-label": `AI Prompt：${task.title}`, onMouseDown: (event) => event.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "prompt-dialog-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "eyebrow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14 }),
          "AI 執行審核"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: task.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "下方是本工具交給本機 AI 執行器的完整任務 Prompt。核准後會鎖定內容與 SHA-256 雜湊。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "icon-button", type: "button", onClick: onClose, "aria-label": "關閉 Prompt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 19 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prompt-status-strip", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: `execution-status status-${plan.status}`, children: executionStatusLabel[plan.status] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "版本 ",
        plan.promptVersion
      ] }),
      plan.promptHash && /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { title: plan.promptHash, children: [
        "SHA-256 ",
        plan.promptHash.slice(0, 12),
        "…"
      ] }),
      plan.runId && /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
        "Run ",
        plan.runId.slice(0, 12)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prompt-dialog-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "prompt-main-field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "完整執行 Prompt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: promptDraft, readOnly: locked, onChange: (event) => setPromptDraft(event.target.value), spellCheck: false })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "prompt-review-sidebar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "預期產出" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: expectedOutput, readOnly: locked, onChange: (event) => setExpectedOutput(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "執行權限" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: scope, disabled: locked, onChange: (event) => setScope(event.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "read_only", children: "唯讀分析" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "workspace_write", children: "允許在工作區產生／修改檔案" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "允許操作，每行一項" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: allowed, readOnly: locked, onChange: (event) => setAllowed(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "禁止操作，每行一項" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: forbidden, readOnly: locked, onChange: (event) => setForbidden(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prompt-context-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "使用依據" }),
          plan.contextReferences.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "沒有附加來源" }) : plan.contextReferences.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: item.label }),
            item.detail && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: item.detail })
          ] }, `${item.type}-${index}`))
        ] })
      ] })
    ] }),
    (plan.resultSummary || plan.lastError) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: plan.lastError ? "execution-result error" : "execution-result", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: plan.lastError ? "執行錯誤" : "AI 執行結果" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: plan.lastError || plan.resultSummary }),
      Boolean((_a = plan.changedFiles) == null ? void 0 : _a.length) && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
        "異動檔案：",
        plan.changedFiles.join("、")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "prompt-dialog-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message || (plan.status === "approved" ? queueAvailable ? "本機執行器只會執行這個已鎖定版本。" : "此裝置尚未連上私人佇列；可複製 Prompt，或登入後重新核准。" : "修改後必須重新核准，舊雜湊會失效。") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "quiet-button", type: "button", onClick: copyApprovedPrompt, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 15 }),
          "複製 Prompt"
        ] }),
        plan.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "quiet-button", type: "button", disabled: busy, onClick: () => run(onRevoke, "已撤銷核准，Prompt 回到草稿狀態"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
          "撤銷核准"
        ] }),
        !locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "quiet-button", type: "button", disabled: busy || !promptDraft.trim(), onClick: () => run(() => onSave(patch()), "Prompt 草稿已儲存"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
          "儲存草稿"
        ] }),
        !locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "primary-button", type: "button", disabled: busy || !promptDraft.trim(), onClick: () => run(() => onApprove(patch()), "Prompt 已核准並排入執行"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { size: 15 }),
          "核准並排入"
        ] }),
        plan.status === "approved" && queueAvailable && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "queue-indicator", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 15 }),
          "等待本機執行器"
        ] }),
        plan.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "primary-button", type: "button", disabled: busy, onClick: () => run(onAccept, "執行結果已驗收"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 15 }),
          "驗收完成"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AiPromptDialog as default
};
