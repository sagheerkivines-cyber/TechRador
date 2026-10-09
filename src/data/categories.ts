import { CategoryId, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & ML',
    tagline: 'Inference runtimes, low-bit quantization & neuromorphic accelerators',
    description: 'Investigating high-throughput tensor execution pipelines, speculative decoding dynamics, sub-4-bit weights, and bio-inspired silicon matrices for next-generation intelligence workloads.',
    subtopics: [
      'Speculative Decoding & KV Caching',
      'Dynamic Compute & Mixture of Depths',
      'Neuromorphic Spiking Silicon',
      'FlashAttention-3 & FP4 Quantization'
    ],
    accentColor: '#10b981'
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    tagline: 'Kernel schedulers, disaggregated CXL fabrics & zero-overhead telemetry',
    description: 'Deep architectural breakdowns of cloud infrastructure, disaggregated PCIe/CXL 3.0 memory pools, deterministic replication protocols, and micro-virtualization execution runtimes.',
    subtopics: [
      'Linux eBPF Schedulers',
      'CXL 3.0 Disaggregated Memory',
      'Multi-Region Consensus & Raft',
      'Micro-VMMs & WebAssembly Edge'
    ],
    accentColor: '#34d399'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'Post-quantum lattices, confidential compute enclaves & verified drivers',
    description: 'Rigorous security research on ML-KEM post-quantum migration, hardware-enforced memory isolation, zero-knowledge verifiable circuits, and mathematical driver verification.',
    subtopics: [
      'Post-Quantum Cryptography & ML-KEM',
      'AMD SEV-SNP & Intel TDX Enclaves',
      'Recursive zkSNARK Pipelines',
      'Formally Verified Kernel Rust'
    ],
    accentColor: '#059669'
  },
  {
    id: 'hardware-silicon',
    name: 'Hardware & Silicon',
    tagline: 'Advanced packaging, RISC-V vector dies & co-packaged photonics',
    description: 'Analyzing lithography limits, TSMC 3.5D CoWoS interconnects, photonic fiber-to-die waveguide integration, and high-density HBM4 thermal routing.',
    subtopics: [
      'Wafer-Scale Packaging & TSMC CoWoS',
      'RISC-V Vector Extensions (RVV 1.0)',
      'Co-Packaged Optics & Silicon Photonics',
      'High-Bandwidth Memory (HBM4)'
    ],
    accentColor: '#10b981'
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    tagline: 'Lock-free memory engines, async schedulers & formal TLA+ proofs',
    description: 'Engineering paradigms for high-concurrency systems, asynchronous IO multiplexing, mathematical verification of distributed state machines, and chaos-tested persistence engines.',
    subtopics: [
      'Lock-Free Concurrency & Hazard Pointers',
      'Async Work-Stealing IO Schedulers',
      'Formal Verification with TLA+',
      'Deterministic Simulation Testing'
    ],
    accentColor: '#6ee7b7'
  }
];

export const getCategoryById = (id: CategoryId): CategoryInfo | undefined => {
  return CATEGORIES.find(c => c.id === id);
};
