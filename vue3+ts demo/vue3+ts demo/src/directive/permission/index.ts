import useStore from '@/store';
import { Directive, DirectiveBinding } from 'vue';

/**
 * 按钮权限校验
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「超级管理员」拥有所有的按钮权限
    const roles = useStore.state.roles;
    if (roles.includes('ROOT')) {
      return true;
    }
    // 「其他角色」按钮权限校验
    const { value } = binding;
    if (value) {
      const requiredPerms = value; // DOM绑定需要的按钮权限标识

      const hasPerm = useStore.state.buttons?.some((button) => {
        return requiredPerms.includes(button);
      });

      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('需要权限!"');
    }
  }
};

/**
 * 角色权限校验
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      const requiredRoles = value; // DOM绑定需要的角色编码
      const hasRole = useStore.state.roles.some((perm) => {
        return requiredRoles.includes(perm);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('需要权限！');
    }
  }
};
