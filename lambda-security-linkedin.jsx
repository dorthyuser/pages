import { useState } from "react";

const postText = `🔐 Securing AWS Lambda at Enterprise Grade — The Complete Playbook

Most teams deploy Lambda functions fast. Very few secure them properly.

After working with regulated enterprises across fintech, banking, and insurance, here's the full security stack your Lambda architecture needs in 2025.

━━━━━━━━━━━━━━━━━━━━━━
🏗️ 1. VPC ISOLATION
━━━━━━━━━━━━━━━━━━━━━━

Don't leave your Lambdas floating in the public AWS network.

• Deploy inside a private VPC subnet — no internet access by default
• Use VPC Endpoints (PrivateLink) for AWS services (S3, DynamoDB, Secrets Manager) — traffic never leaves AWS backbone
• Separate subnets per environment (dev / staging / prod)
• Restrict egress with NAT Gateway only when external access is needed

⚠️ Cold start penalty is real but manageable with provisioned concurrency. Security > speed.

━━━━━━━━━━━━━━━━━━━━━━
🚪 2. API GATEWAY HARDENING
━━━━━━━━━━━━━━━━━━━━━━

API Gateway is your front door. Treat it like one.

• JWT / Cognito Authorizers — validate tokens before Lambda is even invoked
• Resource Policies — whitelist specific IPs or VPCs at the API level
• WAF Integration — block SQLi, XSS, malicious bots at the edge
• Throttling & Usage Plans — rate limit per API key to prevent abuse
• Private API Gateway — accessible only from within your VPC via VPC Endpoint
• Mutual TLS (mTLS) — client certificate validation for B2B integrations

━━━━━━━━━━━━━━━━━━━━━━
🎭 3. IAM — LEAST PRIVILEGE, ALWAYS
━━━━━━━━━━━━━━━━━━━━━━

Every Lambda gets its own execution role. No shared roles. Ever.

• Scope permissions to exact ARNs, not wildcard resources
• Use IAM Conditions (aws:SourceVpc, aws:SourceIp) to restrict invocation context
• Separate roles for read vs. write operations
• Deny explicit permissions you don't need (DenyAll baseline + allow specific)
• Audit with IAM Access Analyzer quarterly

━━━━━━━━━━━━━━━━━━━━━━
🔑 4. SECRETS MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━

Never hardcode credentials. Never use environment variables for secrets in prod.

• AWS Secrets Manager — automatic rotation, versioning, fine-grained access
• AWS Parameter Store (SecureString) — for config that doesn't rotate often
• Fetch at runtime, not at deploy time
• Cache secrets in-memory within Lambda execution context (not globally)

━━━━━━━━━━━━━━━━━━━━━━
🔍 5. OBSERVABILITY & THREAT DETECTION
━━━━━━━━━━━━━━━━━━━━━━

You can't secure what you can't see.

• CloudTrail — every Lambda invocation, role assumption, and API call logged
• GuardDuty for Lambda — ML-based anomaly detection on execution behaviour
• CloudWatch Anomaly Detection — flag unusual invocation spikes
• AWS Config Rules — enforce Lambda config standards (no public URLs, VPC required)
• EventBridge → Security Hub → SIEM pipeline for enterprise SOC integration

━━━━━━━━━━━━━━━━━━━━━━
📦 6. CODE & SUPPLY CHAIN SECURITY
━━━━━━━━━━━━━━━━━━━━━━

The function code itself is an attack surface.

• Amazon Inspector — scan Lambda packages for CVEs automatically
• Dependency pinning — lock all package versions, verify checksums
• Code Signing — enforce signed deployment packages only (Lambda code signing config)
• No Lambda Function URLs with public access — use API Gateway instead
• Container image Lambdas → ECR image scanning on push

━━━━━━━━━━━━━━━━━━━━━━
🌐 7. NETWORK CONTROLS BEYOND VPC
━━━━━━━━━━━━━━━━━━━━━━

• Security Groups on Lambda — restrict outbound ports and destination IPs
• NACLs on subnets — subnet-level stateless firewall rules
• AWS Network Firewall — deep packet inspection for egress traffic
• Transit Gateway — centralise inter-VPC and on-prem connectivity with routing controls

━━━━━━━━━━━━━━━━━━━━━━
⚙️ 8. RUNTIME HARDENING
━━━━━━━━━━━━━━━━━━━━━━

• Set reserved concurrency limits — prevent runaway costs from abuse
• Enforce maximum timeout values — don't leave doors open indefinitely
• Disable Lambda Function URLs unless explicitly needed
• Use Lambda Layers for shared dependencies — centralise patching
• Environment variable encryption with customer-managed KMS keys

━━━━━━━━━━━━━━━━━━━━━━
🏆 THE ENTERPRISE CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━

✅ Lambda inside private VPC subnet
✅ VPC Endpoints for all AWS service calls
✅ API Gateway with WAF + Cognito/JWT auth
✅ Per-function IAM roles with least privilege
✅ Secrets Manager (zero env var secrets in prod)
✅ CloudTrail + GuardDuty for Lambda enabled
✅ Amazon Inspector scanning on all functions
✅ Code signing enforced in prod
✅ KMS encryption on env variables
✅ Reserved concurrency + timeout configured
✅ AWS Config rules for Lambda compliance

━━━━━━━━━━━━━━━━━━━━━━

At AI2DEV, our platform generates Lambda functions with enterprise security patterns baked in — VPC config, IAM roles, Secrets Manager integration — all from a single prompt, delivered via GitOps pipelines directly to your environment.

No copy-paste. No misconfig. Production-ready from day one.

👇 Which of these does your current Lambda setup still need? Drop it in the comments.

#AWSLambda #ServerlessSecurity #EnterpriseCloud #CloudSecurity #AWS #Fintech #AI2DEV #DevSecOps #Serverless #CloudArchitecture`;

const sections = [
  {
    id: "vpc",
    icon: "🏗️",
    title: "VPC Isolation",
    color: "#0ea5e9",
    nodes: [
      { label: "Internet", x: 50, y: 30, type: "external" },
      { label: "NAT Gateway", x: 50, y: 120, type: "gateway" },
      { label: "Private Subnet", x: 50, y: 210, type: "subnet" },
      { label: "Lambda", x: 50, y: 300, type: "lambda" },
      { label: "VPC Endpoint", x: 200, y: 210, type: "endpoint" },
      { label: "AWS Services\n(S3, DDB, SM)", x: 200, y: 300, type: "service" },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [3, 4],
    ],
    desc: "All Lambda functions deployed inside private VPC subnets. AWS services accessed via PrivateLink — zero public internet exposure."
  },
  {
    id: "apigw",
    icon: "🚪",
    title: "API Gateway Hardening",
    color: "#8b5cf6",
    nodes: [
      { label: "Client", x: 50, y: 30, type: "external" },
      { label: "AWS WAF", x: 50, y: 120, type: "waf" },
      { label: "API Gateway\n(Private)", x: 50, y: 210, type: "gateway" },
      { label: "Cognito\nAuthorizer", x: 200, y: 120, type: "auth" },
      { label: "Throttle\n& Usage Plans", x: 200, y: 210, type: "control" },
      { label: "Lambda", x: 50, y: 300, type: "lambda" },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 2], [2, 4], [2, 5],
    ],
    desc: "WAF blocks threats at edge. Cognito JWT validation before Lambda invokes. Rate limiting per API key prevents abuse."
  },
  {
    id: "iam",
    icon: "🎭",
    title: "IAM Least Privilege",
    color: "#f59e0b",
    nodes: [
      { label: "Lambda A\n(Read Role)", x: 50, y: 60, type: "lambda" },
      { label: "Lambda B\n(Write Role)", x: 200, y: 60, type: "lambda" },
      { label: "S3 Bucket\n(Read Only)", x: 50, y: 200, type: "service" },
      { label: "DynamoDB\n(Write Only)", x: 200, y: 200, type: "service" },
      { label: "IAM\nAccess Analyzer", x: 125, y: 310, type: "control" },
    ],
    edges: [
      [0, 2], [1, 3], [0, 4], [1, 4],
    ],
    desc: "Every Lambda gets its own scoped execution role. No wildcards. IAM Access Analyzer audits all permissions continuously."
  },
  {
    id: "observability",
    icon: "🔍",
    title: "Threat Detection",
    color: "#10b981",
    nodes: [
      { label: "Lambda\nInvocation", x: 50, y: 30, type: "lambda" },
      { label: "CloudTrail", x: 50, y: 130, type: "control" },
      { label: "GuardDuty\nfor Lambda", x: 200, y: 130, type: "waf" },
      { label: "Security Hub", x: 125, y: 230, type: "gateway" },
      { label: "SIEM / SOC", x: 125, y: 320, type: "external" },
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
    ],
    desc: "Every invocation logged. GuardDuty ML detects anomalous behaviour. Security Hub aggregates findings into your enterprise SOC."
  }
];

function DiagramNode({ node, color }) {
  const typeColors = {
    external: "#64748b",
    gateway: color,
    subnet: "#334155",
    lambda: "#f97316",
    endpoint: "#06b6d4",
    service: "#6366f1",
    waf: "#ef4444",
    auth: "#8b5cf6",
    control: "#14b8a6",
  };
  const bg = typeColors[node.type] || "#334155";
  const lines = node.label.split("\n");
  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <rect x={-50} y={-22} width={100} height={lines.length > 1 ? 50 : 40} rx={8}
        fill={bg} fillOpacity={0.15} stroke={bg} strokeWidth={1.5} />
      {lines.map((l, i) => (
        <text key={i} textAnchor="middle" y={i === 0 ? (lines.length > 1 ? -4 : 6) : 14}
          fontSize={10} fill={bg} fontWeight={600} fontFamily="'IBM Plex Mono', monospace">{l}</text>
      ))}
    </g>
  );
}

function Diagram({ section }) {
  const { nodes, edges, color } = section;
  return (
    <svg viewBox="0 0 280 370" width="100%" height="100%" style={{ maxHeight: 300 }}>
      <defs>
        <marker id={`arrow-${section.id}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color} fillOpacity={0.6} />
        </marker>
      </defs>
      {edges.map(([from, to], i) => {
        const a = nodes[from], b = nodes[to];
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len, uy = dy / len;
        const x1 = a.x + ux * 52, y1 = a.y + uy * 22;
        const x2 = b.x - ux * 52, y2 = b.y - uy * 22;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeOpacity={0.4} strokeWidth={1.5}
            strokeDasharray="4 3"
            markerEnd={`url(#arrow-${section.id})`} />
        );
      })}
      {nodes.map((n, i) => <DiagramNode key={i} node={n} color={color} />)}
    </svg>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{
        background: copied ? "#10b981" : "#0ea5e9",
        color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, cursor: "pointer",
        transition: "background 0.2s", display: "flex", alignItems: "center", gap: 8
      }}>
      {copied ? "✓ Copied!" : "📋 Copy Post to Clipboard"}
    </button>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const active = sections[activeSection];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1a",
      color: "#e2e8f0",
      fontFamily: "'IBM Plex Sans', sans-serif",
      padding: "32px 16px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ maxWidth: 820, margin: "0 auto 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20
          }}>🔐</div>
          <div>
            
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>
              Securing AWS Lambda — Enterprise Grade
            </h1>
          </div>
        </div>
        <div style={{
          background: "linear-gradient(90deg, #0ea5e920, #8b5cf620)",
          border: "1px solid #1e293b",
          borderRadius: 10, padding: "10px 16px",
          fontSize: 13, color: "#94a3b8", fontFamily: "'IBM Plex Mono', monospace"
        }}>
          📌 Suggested Title: <span style={{ color: "#0ea5e9", fontWeight: 600 }}>"Is Your Lambda Actually Secure? The Enterprise Checklist Most Teams Skip"</span>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Left: Post Preview */}
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{
            background: "#0f172a", border: "1px solid #1e293b",
            borderRadius: 14, overflow: "hidden"
          }}>
            <div style={{
              background: "#1e293b", padding: "12px 20px",
              display: "flex", alignItems: "center", gap: 12,
              borderBottom: "1px solid #334155"
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700, color: "#fff"
              }}>D</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#f1f5f9" }}>Dharm · AI2DEV</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'IBM Plex Mono', monospace" }}>Founder · Just now · 🌐</div>
              </div>
            </div>
            <div style={{
              padding: "20px 24px",
              fontSize: 13.5, lineHeight: 1.75, color: "#cbd5e1",
              maxHeight: 400, overflowY: "auto",
              whiteSpace: "pre-wrap",
              fontFamily: "'IBM Plex Sans', sans-serif"
            }}>
              {postText}
            </div>
            <div style={{
              padding: "12px 24px", borderTop: "1px solid #1e293b",
              display: "flex", gap: 24, alignItems: "center"
            }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>👍 Like · 💬 Comment · 🔁 Repost · 📤 Send</span>
              <CopyButton text={postText} />
            </div>
          </div>
        </div>

        {/* Diagrams */}
        <div style={{ gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1 }}>
            ARCHITECTURE DIAGRAMS
          </h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {sections.map((s, i) => (
              <button key={s.id} onClick={() => setActiveSection(i)}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${activeSection === i ? s.color : "#1e293b"}`,
                  background: activeSection === i ? s.color + "20" : "#0f172a",
                  color: activeSection === i ? s.color : "#64748b",
                  fontSize: 13, cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 600, transition: "all 0.15s"
                }}>
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
            background: "#0f172a", border: `1px solid ${active.color}30`,
            borderRadius: 14, padding: 24
          }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{
                fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
                color: active.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8
              }}>
                {active.icon} Layer {activeSection + 1} / 4
              </div>
              <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{active.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7 }}>{active.desc}</p>
              <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                {sections.map((_, i) => (
                  <div key={i} onClick={() => setActiveSection(i)} style={{
                    width: i === activeSection ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === activeSection ? active.color : "#1e293b",
                    cursor: "pointer", transition: "all 0.2s"
                  }} />
                ))}
              </div>
            </div>
            <div style={{
              background: "#07111f",
              borderRadius: 12, padding: 16,
              border: `1px solid ${active.color}20`
            }}>
              <Diagram section={active} />
            </div>
          </div>
        </div>

        {/* Security Layers Summary */}
        <div style={{ gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1 }}>
            SECURITY LAYERS AT A GLANCE
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { icon: "🏗️", label: "VPC Isolation", items: ["Private Subnets", "VPC Endpoints", "NACLs"], color: "#0ea5e9" },
              { icon: "🚪", label: "API Gateway", items: ["WAF", "JWT Auth", "mTLS", "Throttle"], color: "#8b5cf6" },
              { icon: "🎭", label: "IAM", items: ["Per-fn Roles", "Least Privilege", "Conditions"], color: "#f59e0b" },
              { icon: "🔑", label: "Secrets", items: ["Secrets Manager", "KMS Encryption", "No Env Secrets"], color: "#ef4444" },
              { icon: "🔍", label: "Observability", items: ["CloudTrail", "GuardDuty", "Security Hub"], color: "#10b981" },
              { icon: "📦", label: "Supply Chain", items: ["Inspector", "Code Signing", "Dep Pinning"], color: "#06b6d4" },
              { icon: "🌐", label: "Network", items: ["Security Groups", "Network Firewall", "Transit GW"], color: "#6366f1" },
              { icon: "⚙️", label: "Runtime", items: ["Concurrency Limits", "Timeout Policy", "Layer Patching"], color: "#f97316" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "#0f172a", border: `1px solid ${item.color}25`,
                borderRadius: 10, padding: "14px 16px",
                borderTop: `3px solid ${item.color}`
              }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</div>
                {item.items.map(it => (
                  <div key={it} style={{ fontSize: 11, color: "#64748b", marginBottom: 3 }}>· {it}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ maxWidth: 820, margin: "32px auto 0", textAlign: "center", fontSize: 11, color: "#334155", fontFamily: "'IBM Plex Mono', monospace" }}>
        AI2DEV · Enterprise Lambda Security Post · ai2dev.com
      </div>
    </div>
  );
}
