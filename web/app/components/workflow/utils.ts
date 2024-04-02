import {
  Position,
  getConnectedEdges,
} from 'reactflow'
import dagre from 'dagre'
import { cloneDeep } from 'lodash-es'
import type {
  Edge,
  Node,
} from './types'
import { BlockEnum } from './types'
import {
  NODE_WIDTH_X_OFFSET,
  START_INITIAL_POSITION,
} from './constants'
import type { QuestionClassifierNodeType } from './nodes/question-classifier/types'

export const initialNodes = (nodes: Node[], edges: Edge[]) => {
  const firstNode = nodes[0]

  if (!firstNode?.position) {
    nodes.forEach((node, index) => {
      node.position = {
        x: START_INITIAL_POSITION.x + index * NODE_WIDTH_X_OFFSET,
        y: START_INITIAL_POSITION.y,
      }
    })
  }
  return nodes.map((node) => {
    node.type = 'custom'

    const connectedEdges = getConnectedEdges([node], edges)
    node.data._connectedSourceHandleIds = connectedEdges.filter(edge => edge.source === node.id).map(edge => edge.sourceHandle || 'source')
    node.data._connectedTargetHandleIds = connectedEdges.filter(edge => edge.target === node.id).map(edge => edge.targetHandle || 'target')

    if (node.data.type === BlockEnum.IfElse) {
      node.data._targetBranches = [
        {
          id: 'true',
          name: 'IS TRUE',
        },
        {
          id: 'false',
          name: 'IS FALSE',
        },
      ]
    }

    if (node.data.type === BlockEnum.QuestionClassifier) {
      node.data._targetBranches = (node.data as QuestionClassifierNodeType).classes.map((topic) => {
        return topic
      })
    }

    return node
  })
}

export const initialEdges = (edges: Edge[], nodes: Node[]) => {
  const nodesMap = nodes.reduce((acc, node) => {
    acc[node.id] = node

    return acc
  }, {} as Record<string, Node>)
  return edges.map((edge) => {
    edge.type = 'custom'

    if (!edge.data?.sourceType)
      edge.data = { ...edge.data, sourceType: nodesMap[edge.source].data.type! } as any

    if (!edge.data?.targetType)
      edge.data = { ...edge.data, targetType: nodesMap[edge.target].data.type! } as any

    return edge
  })
}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
export const getLayoutByDagre = (originNodes: Node[], originEdges: Edge[]) => {
  const nodes = cloneDeep(originNodes)
  const edges = cloneDeep(originEdges)
  dagreGraph.setGraph({
    rankdir: 'LR',
    align: 'UL',
    nodesep: 64,
    ranksep: 40,
  })
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.width, height: node.height })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  return dagreGraph
}

export const canRunBySingle = (nodeType: BlockEnum) => {
  return nodeType === BlockEnum.LLM
    || nodeType === BlockEnum.KnowledgeRetrieval
    || nodeType === BlockEnum.Code
    || nodeType === BlockEnum.TemplateTransform
    || nodeType === BlockEnum.QuestionClassifier
    || nodeType === BlockEnum.HttpRequest
    || nodeType === BlockEnum.Tool
}

type ConnectedSourceOrTargetNodesChange = {
  type: string
  edge: Edge
}[]
export const getNodesConnectedSourceOrTargetHandleIdsMap = (changes: ConnectedSourceOrTargetNodesChange, nodes: Node[]) => {
  const nodesConnectedSourceOrTargetHandleIdsMap = {} as Record<string, any>

  changes.forEach((change) => {
    const {
      edge,
      type,
    } = change
    const sourceNode = nodes.find(node => node.id === edge.source)
    const sourceNodeConnectedSourceHandleIds = sourceNode?.data._connectedSourceHandleIds || []
    const targetNode = nodes.find(node => node.id === edge.target)
    const targetNodeConnectedTargetHandleIds = targetNode?.data._connectedTargetHandleIds || []

    if (sourceNode) {
      const newSourceNodeConnectedSourceHandleIds = type === 'remove'
        ? sourceNodeConnectedSourceHandleIds.filter(handleId => handleId !== edge.sourceHandle)
        : sourceNodeConnectedSourceHandleIds.concat(edge.sourceHandle || 'source')
      if (!nodesConnectedSourceOrTargetHandleIdsMap[sourceNode.id]) {
        nodesConnectedSourceOrTargetHandleIdsMap[sourceNode.id] = {
          _connectedSourceHandleIds: newSourceNodeConnectedSourceHandleIds,
        }
      }
      else {
        nodesConnectedSourceOrTargetHandleIdsMap[sourceNode.id]._connectedSourceHandleIds = newSourceNodeConnectedSourceHandleIds
      }
    }
    if (targetNode) {
      const newTargetNodeConnectedTargetHandleIds = type === 'remove'
        ? targetNodeConnectedTargetHandleIds.filter(handleId => handleId !== edge.targetHandle)
        : targetNodeConnectedTargetHandleIds.concat(edge.targetHandle || 'target')
      if (!nodesConnectedSourceOrTargetHandleIdsMap[targetNode.id]) {
        nodesConnectedSourceOrTargetHandleIdsMap[targetNode.id] = {
          _connectedTargetHandleIds: newTargetNodeConnectedTargetHandleIds,
        }
      }
      else {
        nodesConnectedSourceOrTargetHandleIdsMap[targetNode.id]._connectedTargetHandleIds = newTargetNodeConnectedTargetHandleIds
      }
    }
  })

  return nodesConnectedSourceOrTargetHandleIdsMap
}

export const generateNewNode = ({ data, position }: Pick<Node, 'data' | 'position'>) => {
  return {
    id: `${Date.now()}`,
    type: 'custom',
    data,
    position,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  } as Node
}
