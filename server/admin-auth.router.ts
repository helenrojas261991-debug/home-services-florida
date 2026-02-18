import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { authenticateAdmin, verifySession, logoutAdmin } from "./admin-auth";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";

export const adminAuthRouter = router({
  /**
   * Login with username and password
   * Returns session token to be stored in cookie
   */
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(({ input, ctx }) => {
      const token = authenticateAdmin(input.username, input.password);

      if (!token) {
        return {
          success: false,
          error: "Invalid username or password",
        };
      }

      // Set session cookie
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie("admin_session", token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      return {
        success: true,
        token,
      };
    }),

  /**
   * Check if current session is valid
   */
  checkSession: publicProcedure.query(({ ctx }) => {
    const token = ctx.req.cookies?.admin_session;

    if (!token) {
      return {
        authenticated: false,
      };
    }

    const isValid = verifySession(token);

    return {
      authenticated: isValid,
    };
  }),

  /**
   * Logout - clear session
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    const token = ctx.req.cookies?.admin_session;

    if (token) {
      logoutAdmin(token);
    }

    // Clear cookie
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie("admin_session", { ...cookieOptions, maxAge: -1 });

    return {
      success: true,
    };
  }),
});

export type AdminAuthRouter = typeof adminAuthRouter;
