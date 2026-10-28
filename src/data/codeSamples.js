// Representative snippets shown in the "In the editor" section. `lang` selects the highlighter rules.
export const heroCode = `const engineer = {
  name: 'Ahtisham Qasim',
  role: 'Full-Stack Software Engineer',
  backend: ['Java', 'Spring', 'Node.js'],
  frontend: ['React', 'Redux', 'MUI'],
  data: ['PostgreSQL', 'Oracle'],
  ships: 'secure, tested, production-ready',
};

await deploy(engineer); // shipped`;

export const terminalLines = [
  { tone: 't-p', text: '$ npm test' },
  { tone: 't-ok', text: '✓ 48 API tests passed' },
  { tone: 't-ok', text: '✓ e2e: checkout journey (22 checks)' },
  { tone: 't-p', text: '$ git push origin main' },
  { tone: 't-hi', text: '→ pipeline: build · lint · test' },
  { tone: 't-ok', text: '✓ deployed to production in 41s' },
];

export const codeSamples = [
  {
    id: 'java',
    lang: 'java',
    badge: 'J',
    title: 'Spring REST API',
    caption: 'Role-secured billing endpoints',
    file: 'InvoiceController.java',
    langLabel: 'Java 17',
    code: `@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoices;

    public InvoiceController(InvoiceService invoices) {
        this.invoices = invoices;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'BILLING')")
    public Page<InvoiceDto> list(@RequestParam(defaultValue = "PENDING") Status status,
                                 Pageable page) {
        return invoices.findByStatus(status, page);
    }

    @PostMapping("/{id}/payments")
    @PreAuthorize("hasRole('BILLING')")
    public ResponseEntity<PaymentDto> verify(@PathVariable Long id,
                                             @Valid @RequestBody PaymentRequest req) {
        PaymentDto paid = invoices.verifyPayment(id, req);
        return ResponseEntity.status(HttpStatus.CREATED).body(paid);
    }
}`,
  },
  {
    id: 'node',
    lang: 'js',
    badge: 'N',
    title: 'Express middleware',
    caption: 'JWT audiences & rate limits',
    file: 'auth.middleware.js',
    langLabel: 'Node.js 24',
    code: `// Every token carries the audience it was issued for.
export function requireAuth(kind) {
  return (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Sign in required' });

    try {
      const claims = jwt.verify(token, process.env.JWT_SECRET);
      if (claims.kind !== kind) throw new Error('wrong audience');
      req.user = claims;
      next();
    } catch {
      res.status(401).json({ error: 'Session expired' });
    }
  };
}

router.post('/orders', requireAuth('customer'), rateLimit({ max: 20 }),
  async (req, res) => {
    const order = await orders.place(req.user.id, req.body);
    res.status(201).json(order);
  });`,
  },
  {
    id: 'react',
    lang: 'js',
    badge: 'R',
    title: 'React data grid',
    caption: 'Cancellable fetch, sorted view',
    file: 'InvoiceTable.jsx',
    langLabel: 'React 19',
    code: `export default function InvoiceTable({ status }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    api.get(\`/invoices?status=\${status}\`, { signal: ctrl.signal })
      .then(({ data }) => setRows(data.items))
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [status]);

  if (loading) return <Skeleton rows={6} />;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ sorting: { sortModel: [{ field: 'dueDate', sort: 'asc' }] } }}
    />
  );
}`,
  },
  {
    id: 'sql',
    lang: 'sql',
    badge: 'S',
    title: 'SQL reporting',
    caption: 'Overdue balances by package',
    file: 'overdue_by_package.sql',
    langLabel: 'PostgreSQL',
    code: `-- Overdue balance per package, oldest debt first
SELECT p.name                        AS package,
       COUNT(i.id)                   AS overdue_invoices,
       SUM(i.amount - i.paid_amount) AS outstanding,
       MIN(i.due_date)               AS oldest_due
FROM   invoices  i
JOIN   customers c ON c.id = i.customer_id
JOIN   packages  p ON p.id = c.package_id
WHERE  i.status = 'PENDING'
  AND  i.due_date < CURRENT_DATE
GROUP  BY p.name
HAVING SUM(i.amount - i.paid_amount) > 0
ORDER  BY oldest_due;`,
  },
];
